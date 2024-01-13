import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type {
  Devices,
  ItemTypes,
  Page,
  PlaybackState,
  Playlist,
  Queue,
  RecentlyPlayedTracksPage,
  SearchResults,
  UserProfile,
} from "@spotify/web-api-ts-sdk";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const baseUrl = "https://api.spotify.com/v1";

const spotify = async <T>(
  path: string,
  token: string | undefined,
  method?: string,
  body?: unknown,
) => {
  method = method ?? "GET";
  if (!token)
    throw new TRPCError({ code: "UNAUTHORIZED", message: "No token provided" });
  const request = await fetch(baseUrl + path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: method ?? "GET",
    body: body ? JSON.stringify(body) : undefined,
  });
  if (request.status >= 400)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Spotify API error ${request.status} ${path} ${method}`,
      cause: request,
    });
  if (request.status === 204) return null;
  const response = method === "GET" ? ((await request.json()) as T) : undefined;
  return response;
};

const getPlaybackState = async (token: string | undefined) =>
  await spotify<PlaybackState>("/me/player", token);

export const spotifyRouter = createTRPCRouter({
  profile: protectedProcedure.query(async ({ ctx }) => {
    return await spotify<UserProfile>("/me", ctx.auth.oauthToken?.token);
  }),
  addItemToPlaybackQueue: protectedProcedure
    .input(z.object({ uri: z.string() }))
    .mutation(async ({ input: { uri }, ctx }) => {
      const usersQueue = await spotify<Queue>(
        "/me/player/queue",
        ctx.auth?.oauthToken?.token,
      );
      const recentlyPlayedTracks = await spotify<RecentlyPlayedTracksPage>(
        "/me/player/recently-played",
        ctx.auth?.oauthToken?.token,
      );
      if (!usersQueue?.queue)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Pas de file d'attente trouvée",
        });
      if (!recentlyPlayedTracks?.items)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Pas de pistes récemment jouées trouvées",
        });
      if (usersQueue.queue.filter((item) => item.uri === uri).length > 0)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Cette piste est déjà dans la file d'attente",
        });
      if (
        recentlyPlayedTracks.items.filter((item) => item.track.uri === uri)
          .length > 0
      )
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Cette pistes a déjà été jouée récemment",
        });
      return await spotify(
        `/me/player/queue?uri=${uri}`,
        ctx.auth?.oauthToken?.token,
        "POST",
      );
    }),
  search: protectedProcedure
    .input(
      z.object({
        cursor: z.object({ offset: z.number().min(0).max(1000) }).nullish(),
        limit: z.number().min(1).max(49),
        query: z.string().min(1),
      }),
    )
    .query(async ({ input, ctx }) => {
      const type: ItemTypes = "track";
      const search = await spotify<SearchResults<["track"]>>(
        `/search?q=${input.query}&type=${type}&limit=${input.limit}&offset=${
          input.cursor?.offset ?? 0
        }`,
        ctx.auth?.oauthToken?.token,
      );
      const offset = input.cursor?.offset ?? 0;
      const nextCursor: typeof input.cursor = {
        offset: offset + input.limit,
      };
      return {
        items: search,
        nextCursor,
      };
    }),
  // searchTest: protectedProcedure
  //   .input(
  //     z.object({
  //       query: z.string(),
  //     }),
  //   )
  //   .query(async ({ input, ctx: { session } }) => {
  //     const spotify = await Spotify.getInstance(session);
  //     const search = await spotify.search(
  //       input.query,
  //       ["track", "album", "artist"],
  //       undefined,
  //       3,
  //     );
  //     return {
  //       search,
  //     };
  //   }),
  startResumePlayback: protectedProcedure
    .input(
      z.object({
        context_uri: z.string().optional(),
        uris: z.array(z.string()).optional(),
        offset: z.object({}).optional(),
        position_ms: z.number().optional(),
      }),
    )
    .mutation(
      async ({ input: { context_uri, uris, offset, position_ms }, ctx }) => {
        const playbackState = await getPlaybackState(
          ctx.auth.oauthToken?.token,
        );
        if (!playbackState?.device.id)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "No device found",
          });
        return await spotify(
          `/me/player/play?device_id=${playbackState.device.id}`,
          ctx.auth?.oauthToken?.token,
          "PUT",
          {
            context_uri,
            uris,
            offset,
            position_ms,
          },
        );
      },
    ),
  pausePlayback: protectedProcedure.mutation(async ({ ctx }) => {
    const playbackState = await getPlaybackState(ctx.auth.oauthToken?.token);
    if (!playbackState?.device.id)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No device found",
      });
    return await spotify(
      `/me/player/pause?device_id=${playbackState.device.id}`,
      ctx.auth?.oauthToken?.token,
      "PUT",
    );
  }),

  getCurrentlyPlayingTrack: protectedProcedure.query(async ({ ctx }) => {
    return await spotify<PlaybackState>(
      "/me/player/currently-playing",
      ctx.auth?.oauthToken?.token,
    );
  }),
  getUserQueue: protectedProcedure.query(async ({ ctx }) => {
    return await spotify<Queue>(
      "/me/player/queue",
      ctx.auth?.oauthToken?.token,
    );
  }),
  getPlaybackState: protectedProcedure.query(async ({ ctx }) => {
    return await getPlaybackState(ctx.auth.oauthToken?.token);
  }),
  setPlaybackVolume: protectedProcedure
    .input(z.number().min(0).max(100))
    .mutation(async ({ input, ctx }) => {
      return await spotify(
        `/me/player/volume?volume_percent=${input}`,
        ctx.auth?.oauthToken?.token,
        "PUT",
      );
    }),
  getAvailableDevices: protectedProcedure.query(async ({ ctx }) => {
    return await spotify<Devices>(
      "/me/player/devices",
      ctx.auth?.oauthToken?.token,
    );
  }),
  transferPlayback: protectedProcedure
    .input(z.object({ device: z.string() }))
    .mutation(async ({ input: { device }, ctx }) => {
      return await spotify("/me/player", ctx.auth?.oauthToken?.token, "PUT", {
        device_ids: [device],
      });
    }),
  getCurrentUserPlaylists: protectedProcedure.query(async ({ ctx }) => {
    return await spotify<Page<Playlist>>(
      "/me/playlists",
      ctx.auth?.oauthToken?.token,
    );
  }),
  getRecentlyPlayedTracks: protectedProcedure.query(async ({ ctx }) => {
    return await spotify<RecentlyPlayedTracksPage>(
      "/me/player/recently-played",
      ctx.auth?.oauthToken?.token,
    );
  }),
});

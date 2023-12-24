import { Spotify } from "@/lib/spotify";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { type MaxInt } from "@spotify/web-api-ts-sdk";
import { z } from "zod";

export const spotifyRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    if (!ctx?.session?.user.id) return null;
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
  profile: publicProcedure.query(async () => {
    const spotify = await Spotify.getInstance();
    const profile = await spotify.currentUser.profile();
    return profile;
  }),
  addItemToPlaybackQueue: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const spotify = await Spotify.getInstance();
      return spotify.player.addItemToPlaybackQueue(input);
    }),
  search: publicProcedure
    .input(
      z.object({
        cursor: z.object({ offset: z.number().min(0).max(1000) }).nullish(),
        limit: z.number().min(1).max(49),
        query: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const spotify = await Spotify.getInstance();
      const search = await spotify.search(
        input.query,
        ["track"],
        undefined,
        input.limit as MaxInt<50>,
        input.cursor?.offset ?? 0,
      );
      console.log("search", search);
      const offset = input.cursor?.offset ?? 0;
      const nextCursor: typeof input.cursor = {
        offset: offset + input.limit,
      };
      return {
        items: search,
        nextCursor,
      };
    }),
  startResumePlayback: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const spotify = await Spotify.getInstance();
      return spotify.player.startResumePlayback(input);
    }),
  pausePlayback: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const spotify = await Spotify.getInstance();
      return spotify.player.pausePlayback(input);
    }),

  getCurrentlyPlayingTrack: protectedProcedure.query(async () => {
    const spotify = await Spotify.getInstance();
    return spotify.player.getCurrentlyPlayingTrack();
  }),
  getUsersQueue: protectedProcedure.query(async () => {
    const spotify = await Spotify.getInstance();
    return spotify.player.getUsersQueue();
  }),
  getPlaybackState: protectedProcedure.query(async () => {
    const spotify = await Spotify.getInstance();
    return spotify.player.getPlaybackState();
  }),
  setPlaybackVolume: protectedProcedure
    .input(z.number().min(0).max(100))
    .mutation(async ({ input }) => {
      const spotify = await Spotify.getInstance();
      return spotify.player.setPlaybackVolume(input);
    }),
  getAvailableDevices: protectedProcedure.query(async () => {
    const spotify = await Spotify.getInstance();
    return spotify.player.getAvailableDevices();
  }),
  transferPlayback: protectedProcedure
    .input(z.object({ device: z.string() }))
    .mutation(async ({ input: { device } }) => {
      const spotify = await Spotify.getInstance();
      return spotify.player.transferPlayback([device]);
    }),
  getCurrentUserPlaylists: protectedProcedure.query(async () => {
    const spotify = await Spotify.getInstance();
    return spotify.currentUser.playlists.playlists();
  }),
});

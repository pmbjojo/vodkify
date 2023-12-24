import { env } from "@/env";
import { getServerAuthSession } from "@/server/auth";
import { type AccessToken, SpotifyApi, Scopes } from "@spotify/web-api-ts-sdk";

export const scopes = Scopes.all;

export class Spotify {
  private static instance: SpotifyApi;
  public static async getInstance(): Promise<SpotifyApi> {
    if (!Spotify.instance) {
      const session = await getServerAuthSession();
      if (session?.user) {
        const accessToken: AccessToken = {
          access_token: session.user.accessToken,
          // expires_in: session.user.expiresAt - new Date().valueOf(),
          expires_in: 1000000,
          // refresh_token: session.user.refreshToken,
          refresh_token: "",
          token_type: session.user.tokenType,
        };
        Spotify.instance = SpotifyApi.withAccessToken(
          env.SPOTIFY_CLIENT_ID,
          accessToken,
        );
      }
    }
    return Spotify.instance;
  }
}

// export const scopes = [
//   // "ugc-image-upload",
//   "user-read-playback-state",
//   "user-modify-playback-state",
//   // "user-read-currently-playing",
//   // "app-remote-control",
//   // "streaming",
//   // "playlist-read-private",
//   // "playlist-read-collaborative",
//   // "playlist-modify-private",
//   // "playlist-modify-public",
//   // "user-follow-modify",
//   // "user-follow-read",
//   // "user-read-playback-position",
//   // "user-read-recently-played",
//   // "user-library-modify",
//   "user-top-read",
//   "user-library-read",
//   // "user-read-email",
//   "user-read-private",
//   // "user-soa-link",
//   // "user-soa-unlink",
//   // "user-manage-entitlements",
//   // "user-manage-partner",
//   // "user-create-partner",
// ];

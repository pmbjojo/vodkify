import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  TokenSet,
} from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { env } from "@/env";
import { db } from "@/server/db";
import { Spotify, scopes } from "@/lib/spotify";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
      tokenType: string;
      expiresAt: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const account = await db.account.findFirst({
        where: { userId: user.id },
      });
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          accessToken: account?.access_token,
          refreshToken: account?.refresh_token,
          tokenType: account?.token_type,
          expiresAt: account?.expires_at,
        },
      };
    },
    // jwt: async ({ account, token, user, profile, session, trigger }) => {
    //   if (trigger === "update") {
    //     return { ...token, ...session.user };
    //   }
    //   return token;
    // },
    async jwt({ token, account }) {
      if (account) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        try {
          const s = await Spotify.getInstance();
          const a = await s.authenticate();
          const t = await s.getAccessToken();
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.

          const tokens: TokenSet = {
            access_token: t?.access_token,
            expires_at: t?.expires,
            refresh_token: t?.refresh_token,
            token_type: t?.token_type,
          };

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,
            expires_at: tokens.expires_at,
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: { params: { scope: scopes.join(",") } },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

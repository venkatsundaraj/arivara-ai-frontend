import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { env } from "@/env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // console.log("Session Callback - token:", token);
      // console.log("Session Callback - session before:", session);

      if (token?.id && session?.user) {
        session.user.id = token.id;
        session.user.email = token.email || session.user.email;
        session.user.name = token.name || session.user.name;
        session.user.image = token.picture || session.user.image;
      }

      // console.log("Session Callback - session after:", session);
      return session;
    },
    async jwt({ token, user, account }) {
      if (user?.id) {
        token.id = user.id;
      }
      if (user?.email) {
        token.email = user.email;
      }
      // console.log("JWT Callback - token:", token);
      return token;
    },

    redirect() {
      return "/";
    },
  },
});

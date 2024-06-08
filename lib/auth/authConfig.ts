import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { SiweMessage } from "siwe";

const authConfig: AuthOptions = {
  providers: [
    Credentials({
      id: "siwe",
      name: "SIWE",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        console.log("here");
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const result = await siwe.verify({
            signature: credentials?.signature || "",
          });

          if (result.success) {
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 60000,
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn") {
        if (account) {
          token.accessToken = account.access_token!;
          token.refreshToken = account.refresh_token;

          if (account.provider === "google") {
            token.idToken = account.id_token;
          }

          token.provider = account.provider as Provider;
          token.providerAccountId = account.providerAccountId;
        }
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        idToken: token.idToken,
        username: token.username,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        provider: token.provider,
        providerAccountId: token.providerAccountId,
      };
    },
  },
};

export default authConfig;

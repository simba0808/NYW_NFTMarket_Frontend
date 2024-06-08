import NextAuth from "next-auth/next";

import authConfig from "@/lib/auth/authConfig";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

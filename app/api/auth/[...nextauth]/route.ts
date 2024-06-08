import NextAuth from "next-auth";

import authConfig from "@/lib/auth/authConfig";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

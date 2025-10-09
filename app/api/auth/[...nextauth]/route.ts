import NextAuth from "next-auth";
import { authOptions } from "@shared/lib/auth";

const handler = NextAuth(authOptions);

// NextAuth's handler can be exported for the App Router as GET and POST handlers.
export { handler as GET, handler as POST };

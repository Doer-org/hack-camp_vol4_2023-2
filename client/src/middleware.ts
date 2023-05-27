import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile/:path*"],
};

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  res.cookies.set("session", JSON.stringify(session), {
    sameSite: "lax",
    httpOnly: true,
  });
  return res;
});

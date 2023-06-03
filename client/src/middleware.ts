import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile/:path*", "/timeline/:path*", "/notification/:path*"],
};

export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest
) {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  const accessToken = session?.accessToken;
  const idToken = session?.idToken;
  if (accessToken)
    res.cookies.set("accessToken", accessToken, {
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  if (idToken)
    res.cookies.set("idToken", idToken, {
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  return res;
});

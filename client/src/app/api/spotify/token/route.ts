import { getAccessToken } from "@/pages/api/spotify/client/client";
import { NextResponse } from "next/server";

export async function GET() {
  const resp = await getAccessToken();
  return NextResponse.json(resp);
}

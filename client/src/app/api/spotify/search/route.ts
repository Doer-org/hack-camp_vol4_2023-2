import { searchArtist } from "@/api/spotify/search";
import { NextResponse } from "next/server";

export async function GET() {
  const artists = await searchArtist("bump");
  return NextResponse.json(artists);
}

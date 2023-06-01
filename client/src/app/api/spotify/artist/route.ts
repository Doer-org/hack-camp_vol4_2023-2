import { readArtist } from "@/api/spotify/artist";
import { NextResponse } from "next/server";

export async function GET() {
  const artist = await readArtist("0TnOYISbd1XYRBk9myaseg");
  return NextResponse.json(artist);
}

import { spotifyApiClient } from "../client";
import { ArtistResponse } from "./types";

export const searchArtist = async (q: string) =>
  await spotifyApiClient.get<ArtistResponse>(
    `${process.env.NEXT_PUBLIC_SPOTIFY_API_BASE_URL}/search?q=${q}&type=artist&limit=10`
  );

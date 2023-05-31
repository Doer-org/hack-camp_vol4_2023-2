import { spotifyApiClient } from "../client";

export const searchArtist = async (q: string) =>
  await spotifyApiClient.get(
    `${process.env.SPOTIFY_API_BASE_URL}/search?q=${q}&type=artist&limit=10`
  );

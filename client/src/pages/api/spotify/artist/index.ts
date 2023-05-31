import { spotifyApiClient } from "../client";

export const readArtist = async (id: string) =>
  await spotifyApiClient.get(
    `${process.env.SPOTIFY_API_BASE_URL}/artists/${id}`
  );

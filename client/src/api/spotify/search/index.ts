import { spotifyApiClient } from "../client";
import { ArtistsResponse, TracksResponse } from "./types";

export const searchArtist = async (q: string) =>
  await spotifyApiClient.get<ArtistsResponse>(
    `${process.env.NEXT_PUBLIC_SPOTIFY_API_BASE_URL}/search?q=${q}&type=artist&limit=10`
  );

export const searchTrack = async (q: string) =>
  await spotifyApiClient.get<TracksResponse>(
    `${process.env.NEXT_PUBLIC_SPOTIFY_API_BASE_URL}/search?q=${q}&type=track&limit=10`
  );

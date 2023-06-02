import { env } from "@/utils";
import { spotifyApiClient } from "../client";
import { ArtistsResponse, TracksResponse } from "./types";

const { spotifyApiBaseURL } = env();

export const searchArtist = async (q: string) =>
  await spotifyApiClient.get<ArtistsResponse>(
    `${spotifyApiBaseURL}/search?q=${q}&type=artist&limit=10`
  );

export const searchTrack = async (q: string) =>
  await spotifyApiClient.get<TracksResponse>(
    `${spotifyApiBaseURL}/search?q=${q}&type=track&limit=10`
  );

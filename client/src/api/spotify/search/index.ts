import { env } from "@/utils";
import { ResponseError, Result, Token, spotifyApiClient } from "../client";
import { ArtistsResponse, TracksResponse } from "./types";

const { spotifyApiBaseURL } = env();

export const searchArtist = async (
  q: string,
  token: Result<Token, ResponseError>
) => {
  return await spotifyApiClient.get<ArtistsResponse>(
    `${spotifyApiBaseURL}/search?q=${q}&type=artist&limit=10`,
    token
  );
};

export const searchTrack = async (
  q: string,
  token: Result<Token, ResponseError>
) => {
  return await spotifyApiClient.get<TracksResponse>(
    `${spotifyApiBaseURL}/search?q=${q}&type=track&limit=10`,
    token
  );
};

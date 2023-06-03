import { env } from "@/utils";
import { ResponseError, Result, Token, spotifyApiClient } from "../client";
import { Artist } from "../types";

const { spotifyApiBaseURL } = env();

export const readArtist = async (
  id: string,
  token: Result<Token, ResponseError>
) =>
  await spotifyApiClient.get<Artist>(
    `${spotifyApiBaseURL}/artists/${id}`,
    token
  );

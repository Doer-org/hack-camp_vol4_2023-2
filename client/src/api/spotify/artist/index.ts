import { env } from "@/utils";
import { ResponseError, Result, Token, spotifyApiClient } from "../client";

const { spotifyApiBaseURL } = env();

export const readArtist = async (
  id: string,
  token: Result<Token, ResponseError>
) => await spotifyApiClient.get(`${spotifyApiBaseURL}/artists/${id}`, token);

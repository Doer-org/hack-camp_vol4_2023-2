import { env } from "@/utils";
import { spotifyApiClient } from "../client";

const { spotifyApiBaseURL } = env();

export const readArtist = async (id: string) =>
  await spotifyApiClient.get(`${spotifyApiBaseURL}/artists/${id}`);

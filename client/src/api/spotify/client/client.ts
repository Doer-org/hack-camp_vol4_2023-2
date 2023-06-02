import { Result } from "./types";
import { env } from "@/utils";

export type Token = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type ResponseError = {
  status: number;
  message: string;
};

const resp2result = async <T>(
  resp: Response
): Promise<Result<T, ResponseError>> => {
  const data = await resp.json();
  if (!resp.ok) {
    return {
      type: "error",
      error: {
        status: resp.status,
        message: resp.statusText,
      },
    };
  }
  return { type: "ok", value: data };
};

export const getAccessToken = async <T = Token>() => {
  const { spotifyClientID, spotifyClientSecret, spotifyRefreshToken } = env();
  const resp = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotifyClientID + ":" + spotifyClientSecret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${spotifyRefreshToken}`,
    next: {
      revalidate: 3590,
    },
  });
  return await resp2result<T>(resp);
};

export const spotifyApiClient = {
  get: async <T>(url: string, token: Result<Token, ResponseError>) => {
    if (token.type === "error") return;
    const resp = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `${token.value.token_type} ${token.value.access_token}`,
      },
    });
    return await resp2result<T>(resp);
  },
};

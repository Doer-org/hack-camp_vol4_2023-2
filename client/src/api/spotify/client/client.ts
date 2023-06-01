import { Result } from "./types";

export type ResponseError = {
  status: number;
  message: string;
};

export const getAccessToken = async () => {
  const { data, err } = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID +
            ":" +
            process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${process.env.NEXT_PUBLIC_SPOTIFY_API_REFRESH_TOKEN}`,
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) return { err: data };
    return { data };
  });
  return { data, err };
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

export const spotifyApiClient = {
  get: async <T>(url: string) => {
    const { data, err } = await getAccessToken();
    if (err) return;
    const resp = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `${data.token_type} ${data.access_token}`,
      },
    });
    return await resp2result<T>(resp);
  },
};

const getAccess = async () => {
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
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&sj",
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) return { err: data };
    return { data };
  });
  return data;
};

const resp2result = async (resp: Response) => {
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
  get: async (url: string) => {
    const { access_token, token_type } = await getAccess();
    const data = await fetch(url, {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
    return await resp2result(data);
  },
};

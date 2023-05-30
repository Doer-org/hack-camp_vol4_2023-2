import { useEnv } from "@/utils/env";

const useAccess = async () => {
  const { spotifyClientID, spotifyClientSecret } = useEnv();
  const { data, err } = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotifyClientID + ":" + spotifyClientSecret).toString(
          "base64"
        ),
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&",
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) return { err: data };
    return { data };
  });
  return data;
};

const useClient = async (url: string) => {
  const { access_token, token_type } = await useAccess();
  console.log(access_token, token_type);
  return fetch(url, {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });
};

export const useArtist = async () => {
  const { access_token, token_type } = await useAccess();
  const data = await fetch(
    "https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg",
    {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    }
  ).then(async (res) => {
    const data = await res.json();
    return data;
  });
  return {
    id: data["id"],
    name: data["name"],
    image: data["images"][1]["url"],
  };
};

export const useSearch = async (q: string) => {
  const { access_token, token_type } = await useAccess();
  const query = new URLSearchParams({ q: q });
  const data = await fetch(
    `https://api.spotify.com/v1/search?${query}&type=album`,
    {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    }
  ).then(async (res) => {
    const data = await res.json();
    return data;
  });
  return data;
};

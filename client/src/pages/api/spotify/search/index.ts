import { spotifyApiClient } from "../client";
import { ArtistResponse } from "./types";

export const searchArtist = async (q: string) => {
  const data = await spotifyApiClient.get(
    `${process.env.NEXT_PUBLIC_SPOTIFY_API_BASE_URL}/search?q=${q}&type=artist&limit=10`
  );
  if (data.type === "error") return data;
  const artists: ArtistResponse[] = await data.value.artists.items;
  return artists.map((artist) => {
    return {
      id: artist.id,
      image: artist.images[1]["url"],
      name: artist.name,
    };
  });
};

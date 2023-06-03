import { Image } from "./image";

export type SimplifiedArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: "user" | "episode" | "playlist" | "show" | "track" | "album" | "artist";
  uri: string;
};

export type Artist = SimplifiedArtist & {
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  images: Image[];
  popularity: number;
};

export type ArtistsResponse = {
  artists: {
    href: string;
    items: Artist[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
};

type Image = {
  height: number | null;
  url: string;
  width: number | null;
};

export type ArtistResponse = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: "user" | "episode" | "playlist" | "show" | "track" | "album" | "artist";
  uri: string;
};

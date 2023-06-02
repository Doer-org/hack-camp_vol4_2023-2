import { Artist, SimplifiedArtist } from "./artist";
import { Image } from "./image";

type SimplifiedAlbum = {
  album_group?: "single" | "album" | "compilation" | "appears_on";
  album_type: "single" | "album" | "compilation";
  artists: SimplifiedArtist[];
  available_markets?: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: "market" | "product" | "explicit";
  };
  total_tracks: number;
  type: "user" | "episode" | "playlist" | "show" | "track" | "album" | "artist";
  uri: string;
};

type SimplifiedTrack = {
  artists: SimplifiedArtist[];

  available_markets?: string[];

  disc_number: number;

  duration_ms: number;

  explicit: boolean;

  external_urls: {
    spotify: string;
  };

  href: string;

  id: string;

  is_local: boolean;

  is_playable?: boolean;

  linked_from?: {
    external_urls: {
      spotify: string;
    };

    href: string;

    id: string;

    type:
      | "user"
      | "episode"
      | "playlist"
      | "show"
      | "track"
      | "album"
      | "artist";

    uri: string;
  };

  name: string;

  preview_url: string;

  restrictions: {
    reason: "market" | "product" | "explicit";
  }[];

  track_number: number;

  type: "user" | "episode" | "playlist" | "show" | "track" | "album" | "artist";

  uri: string;
};

type Track = SimplifiedTrack & {
  album: SimplifiedAlbum;

  artists: Artist[];

  external_ids: {
    ean: string;

    isrc: string;

    upc: string;
  };

  popularity: number;
};

export type TracksResponse = {
  tracks: {
    href: string;
    items: Track[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
};

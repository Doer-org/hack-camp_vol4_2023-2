"use client";
import React, { useState } from "react";
import { searchArtist } from "@/api/spotify/search";
import { SearchBar } from "@/ui/search-bar/components";
import { SearchResult } from "@/ui";

type Artist = {
  id: string;
  name: string;
  image: string;
};

export default function Page() {
  const [artists, setArtists] = useState<Artist[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await searchArtist(e.target.value);

    if (!result) return;

    if (result.type === "error") return;

    const resultArtists = result.value.artists.items;
    setArtists(
      resultArtists.map((a) => {
        return {
          id: a.id,
          name: a.name,
          image: a.images ? a.images[0].url : "",
        };
      })
    );
  };

  return (
    <>
      <SearchBar contentType="music" onChange={handleChange} />
      {artists?.map((artist) => {
        return (
          <SearchResult
            key={artist.id}
            image={artist.image}
            text={artist.name}
            contentType="music"
          />
        );
      })}
    </>
  );
}

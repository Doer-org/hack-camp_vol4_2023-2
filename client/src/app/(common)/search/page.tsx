"use client";
import React, { useState } from "react";
import { searchArtist } from "@/api/spotify/search";
import { SearchBar } from "@/ui/search-bar/components";
import { SearchResult } from "@/ui";
import * as styles from "./_styles/search.css";

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
      <div className={styles.resultListStyle}>
        {artists?.map((artist) => {
          return (
            <div key={artist.id} className={styles.artistStyle}>
              <SearchResult
                image={artist.image}
                text={artist.name}
                contentType="music"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

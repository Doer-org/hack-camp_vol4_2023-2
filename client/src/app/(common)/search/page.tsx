"use client";
import React, { useState } from "react";
import { searchArtist } from "@/api/spotify/search";
import { SearchBar } from "@/ui/search-bar/components";
import { SearchResult } from "@/ui";
import { RecomCard } from "@/app/_ui";
import * as styles from "./_styles/search.css";
import { getAccessToken } from "@/api/spotify";

type Artist = {
  id: string;
  name: string;
  image: string;
};

export default function Page() {
  const [artists, setArtists] = useState<Artist[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const token = await getAccessToken();
    const result = await searchArtist(e.target.value, token);

    if (!result) return;

    if (result.type === "error") return;

    const resultArtists = result.value.artists.items;
    setArtists(
      resultArtists.map((a) => {
        return {
          id: a.id,
          name: a.name,
          image: a.images ? a.images[0]?.url : "",
        };
      })
    );
  };

  return (
    <>
      <RecomCard
        contentType="person"
        contentName="アーティスト"
        manageActive={true}
      />
      <div className={styles.formWrapperStyle}>
        <SearchBar contentType="artist" onChange={handleChange} />
      </div>
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

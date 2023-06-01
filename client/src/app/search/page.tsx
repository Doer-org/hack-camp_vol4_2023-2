"use client";
import { SearchBar } from "@/ui";
import React, { useState } from "react";
import { searchArtist } from "@/api/spotify";

type Artist = {
  id: string;
  name: string;
  image: string;
};

const Page = () => {
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
      <SearchBar onChange={handleChange} />
      {artists?.map((artist) => {
        return (
          <div key={artist.id}>
            <p>{artist.name}</p>
            <img src={artist.image} alt="ジャケ写" width={320} height={320} />
          </div>
        );
      })}
    </>
  );
};

export default Page;

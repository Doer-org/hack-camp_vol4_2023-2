"use client";
import React, { useEffect, useState } from "react";
import { searchArtist } from "@/pages/api/spotify/search";

type Artist = {
  id: string;
  name: string;
  image: string;
};

export default async function Page() {
  const [artists, setArtists] = useState<Artist[]>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await searchArtist(e.target.value);
    setArtists(result);
  };

  return (
    <>
      <input type="text" onChange={(e) => handleChange(e)} />
      <div>
        {artists.map((artist) => {
          return (
            <div key={artist.id}>
              <p>{artist.name}</p>
              <img src={artist.image} alt="ジャケ写" width={320} height={320} />
            </div>
          );
        })}
      </div>
    </>
  );
}

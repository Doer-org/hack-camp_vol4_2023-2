import React from "react";
import { useArtist, useSearch } from "./client";
import Image from "next/image";

type Artist = {
  id: string;
  name: string;
  image: string;
};

type Result = {
  id: string;
};

export default async function Page() {
  const artist: Artist = await useArtist();
  const result = await useSearch("米津玄師");
  const resultList = [];
  for (let i = 0; i < 20; i++) {
    resultList.push(
      <div key={result["albums"]["items"][i]["id"]}>
        <Image
          src={result["albums"]["items"][i]["images"][1]["url"]}
          alt="ジャケ"
        />
        {result["albums"]["items"][i]["name"]}
      </div>
    );
  }
  console.log(result["albums"]["items"]);
  return (
    <>
      <p>アーティスト</p>
      <Image src={artist.image} alt="ジャケ" />
      {artist.name}
      <p>曲</p>
      {resultList}
    </>
  );
}

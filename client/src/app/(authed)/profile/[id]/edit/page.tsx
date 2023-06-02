"use client";
import React, { useState } from "react";
import * as styles from "../../_styles/profile.css";
import { CommonHeader, RecomCard } from "@/app/_ui";
import { Arrow, Button, Like, SearchResult } from "@/ui";
import { SearchBar } from "@/ui/search-bar/components";
import { getAccessToken, searchArtist } from "@/api/spotify";

type Artist = {
  id: string;
  name: string;
  image: string;
};

const Page = () => {
  const [canSearch, setCanSearch] = useState<boolean>(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [firstId, setFirstId] = useState<string | undefined>();

  const [firstImage, setFirstImage] = useState<string>();

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
          image: a.images ? a.images[2]?.url : "", // 160x160
        };
      })
    );
  };

  const handleFirstClick = () => {
    setCanSearch(true);
  };

  const handleArtistClick = (id: string, image: string) => {
    setFirstId(id);
    setFirstImage(image);
  };

  return (
    <>
      <CommonHeader
        left={<Arrow />}
        title="編集"
        right={<Button color="black">更新</Button>}
      />
      <div className={styles.containerStyle}>
        <div className={styles.contentStyle}>
          <div className={styles.headStyle}>
            <div className={styles.categoriesStyle}>
              <Button color="gray">音楽</Button>
              <Button color="pink">本</Button>
            </div>
            <Like liked={true} num={20} />
          </div>
          <div className={styles.cardListStyle}>
            <div className={styles.cardStyle}>
              <RecomCard
                contentType="person"
                contentName="アーティスト"
                firstImage={firstImage}
                firstOnClick={handleFirstClick}
              />
            </div>
            {canSearch && (
              <>
                <div className={styles.formWrapperStyle}>
                  <SearchBar contentType="artist" onChange={handleChange} />
                </div>
                <div className={styles.resultListStyle}>
                  {artists?.map((artist) => {
                    return (
                      <div
                        key={artist.id}
                        className={styles.artistStyle}
                        onClick={() =>
                          handleArtistClick(artist.id, artist.image)
                        }
                      >
                        <SearchResult
                          image={artist.image}
                          text={artist.name}
                          contentType="person"
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

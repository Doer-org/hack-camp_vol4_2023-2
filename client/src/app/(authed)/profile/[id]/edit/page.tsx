"use client";
import React, { useState } from "react";
import * as commonStyles from "../../../_styles/common.css";
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
  const [firstId, setFirstId] = useState<string>();
  const [secondId, setSecondId] = useState<string>();
  const [thirdId, setthirdId] = useState<string>();
  const [forcusedRank, setForcusedRank] = useState<
    "first" | "second" | "third"
  >();

  const [firstImage, setFirstImage] = useState<string>();
  const [secondImage, setSecondImage] = useState<string>();
  const [thirdImage, setThirdImage] = useState<string>();

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
    setForcusedRank("first");
  };
  const handleSecondClick = () => {
    setCanSearch(true);
    setForcusedRank("second");
  };
  const handleThirdClick = () => {
    setCanSearch(true);
    setForcusedRank("third");
  };

  const handleArtistClick = (id: string, image: string) => {
    console.log(forcusedRank);
    if (forcusedRank === "first") {
      setFirstId(id);
      setFirstImage(image);
    } else if (forcusedRank === "second") {
      setSecondId(id);
      setSecondImage(image);
    } else if (forcusedRank === "third") {
      setthirdId(id);
      setThirdImage(image);
    }
    return;
  };

  return (
    <>
      <CommonHeader
        left={<Arrow />}
        title="編集"
        right={<Button color="black">更新</Button>}
      />
      <div
        className={[
          commonStyles.containerStyle,
          commonStyles.headerAvoidStyle["common"],
        ].join(" ")}
      >
        <div className={commonStyles.contentStyle}>
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
                secondImage={secondImage}
                thirdImage={thirdImage}
                firstOnClick={handleFirstClick}
                secondOnClick={handleSecondClick}
                thirdOnClick={handleThirdClick}
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

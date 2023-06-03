"use client";
import React, { useEffect, useState } from "react";
import * as commonStyles from "../../../_styles/common.css";
import * as styles from "../../_styles/profile.css";
import { CommonHeader } from "@/app/_ui";
import { EditRecomCard } from "./_ui";
import { Arrow, Button, Like, SearchResult } from "@/ui";
import { SearchBar } from "@/ui/search-bar/components";
import {
  getAccessToken,
  searchArtist,
  readArtist,
  getFavoriteArtist,
} from "@/api";
import { updateFavoriteArtist, getUser } from "@/api";
import { useRouter } from "next/navigation";
import { User } from "@/utils";

type Artist = {
  id: string;
  name: string;
  image: string;
};

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  useEffect(() => {
    (async () => {
      const user = await getUser(params.id);

      const artists = await getFavoriteArtist(user?.user_id || "0");
      const first = artists?.filter((a) => a.rank === 1)[0];
      const second = artists?.filter((a) => a.rank === 2)[0];
      const third = artists?.filter((a) => a.rank === 3)[0];

      const token = await getAccessToken();
      if (first) {
        const sArtist = await readArtist(first.artist, token);
        if (sArtist?.type !== "error") {
          setFirstImage(sArtist?.value.images[2].url);
        }
      }
      if (second) {
        const sArtist = await readArtist(second.artist, token);
        if (sArtist?.type !== "error") {
          setSecondImage(sArtist?.value.images[2].url);
        }
      }
      if (third) {
        const sArtist = await readArtist(third.artist, token);
        if (sArtist?.type !== "error") {
          setThirdImage(sArtist?.value.images[2].url);
        }
      }
    })();
  }, [params.id]);

  const [canSearch, setCanSearch] = useState<boolean>(false);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [firstId, setFirstId] = useState<string>("0");
  const [secondId, setSecondId] = useState<string>("0");
  const [thirdId, setthirdId] = useState<string>("0");
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

  const router = useRouter();
  const handleUpdateClick = () => {
    updateFavoriteArtist(params.id, firstId, 1);
    updateFavoriteArtist(params.id, secondId, 2);
    updateFavoriteArtist(params.id, thirdId, 3);
    router.push(`/profile/${params.id}`);
  };

  return (
    <>
      <CommonHeader
        left={<Arrow />}
        title="編集"
        right={
          <Button color="black" onClick={handleUpdateClick}>
            更新
          </Button>
        }
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
              <EditRecomCard
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

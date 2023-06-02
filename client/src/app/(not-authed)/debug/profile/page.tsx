import {
  CreateReactionButton,
  GetMyTimelineButton,
  Token2UserInfoButton,
  UpdateFavoriteRamenya,
} from "../_ui";

const Page = () => {
  return (
    <main
      className=""
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>login successful</div>
      <Token2UserInfoButton />
      <CreateReactionButton />
      <UpdateFavoriteRamenya />
      <GetMyTimelineButton />
    </main>
  );
};

export default Page;

import {
  CreateReactionButton,
  GetMyTimelineButton,
  GetTokenButton,
  Token2UserInfoButton,
  UpdateFavoriteRamenya,
} from "../_ui";

const Page = () => {
  return (
    <div
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
      <GetTokenButton />
    </div>
  );
};

export default Page;

export const env = () => {
  return {
    clientURL: process.env.NEXT_PUBLIC_CLIENT_URL || "",
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    spotifyApiBaseURL: process.env.NEXT_PUBLIC_SPOTIFY_API_BASE_URL || "",
    spotifyClientID: process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID || "",
    spotifyClientSecret:
      process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_SECRET || "",
    spotifyRefreshToken:
      process.env.NEXT_PUBLIC_SPOTIFY_API_REFRESH_TOKEN || "",
  };
};

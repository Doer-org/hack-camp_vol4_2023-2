export const useEnv = () => {
  return {
    clientURL: process.env.NEXT_PUBLIC_CLIENT_URL || "",
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
    spotifyClientID: process.env.SPOTIFY_API_CLIENT_ID || "",
    spotifyClientSecret: process.env.SPOTIFY_API_CLIENT_SECRET || "",
  };
};

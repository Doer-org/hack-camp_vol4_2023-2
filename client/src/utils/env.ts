export const useEnv = () => {
  return {
    clientURL: process.env.NEXT_PUBLIC_CLIENT_URL || "",
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  };
};

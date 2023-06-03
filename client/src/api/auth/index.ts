const fetchToken = async (): Promise<{ token: string }> => {
  const resp = await fetch("/api/auth/token");
  const data = await resp.json();
  return data;
};

const fetchMe = async (): Promise<{
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  sub: string;
  sid: string;
}> => {
  const resp = await fetch("/api/auth/me");
  const data = await resp.json();
  return data;
};

export const fetchAuthInfo = async (): Promise<{
  token: string;
  me: {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    sub: string;
    sid: string;
  };
}> => {
  const token = await fetchToken();
  const me = await fetchMe();
  return { token: token.token, me: me };
};

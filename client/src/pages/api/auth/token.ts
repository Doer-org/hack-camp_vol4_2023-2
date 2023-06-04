import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const audience = process.env.AUTH0_AUDIENCE;
  const { accessToken: token } = await getAccessToken(req, res, {
    authorizationParams: {
      audience: audience,
    },
  });

  res.json({ token });
}

export default withApiAuthRequired(handler);

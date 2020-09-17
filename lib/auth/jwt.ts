import { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";

const SECRET = process.env.JWT_SECRET!;

export const getToken = (req: NextApiRequest) => {
  return jwt.getToken({ req, secret: SECRET });
};

export const requestWrapper = async (
  req: NextApiRequest,
  res: NextApiResponse,
  action: (token: any) => void
) => {
  try {
    const jwtToken = await getToken(req);

    // Add conditions here on data in JWT Token (e.g. team, user)
    if (!jwtToken) {
      res.status(403).json({ message: "Not signed in." });
    } else {
      await action(jwtToken);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: JSON.stringify(e) });
  }
};

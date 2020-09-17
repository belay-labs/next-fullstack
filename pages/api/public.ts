import { NextApiRequest, NextApiResponse } from "next";

import { requestWrapper } from "../../lib/auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ data: ["foo", "bar"] });
};

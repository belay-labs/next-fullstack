import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../db";
import { requestWrapper } from "../../../lib/auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { text } = req.body;

  await requestWrapper(req, res, async (token: any) => {
    const post = await db.Post.create({
      text,
      createdById: token.userId,
    });

    res.status(200).json(post);
  });
};

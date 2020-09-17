import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../db";
import { requestWrapper } from "../../../lib/auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await requestWrapper(req, res, async (token: any) => {
    const posts = await db.Post.findAll({
      include: { model: db.User, as: "createdBy" },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({ posts });
  });
};

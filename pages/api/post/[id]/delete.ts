import { NextApiRequest, NextApiResponse } from "next";

import db from "../../../../db";
import { requestWrapper } from "../../../../lib/auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { text } = req.body;

  await requestWrapper(req, res, async (token: any) => {
    const { query } = req;

    await db.Post.destroy({
      where: { id: query.id },
    });

    res.status(200).end();
  });
};

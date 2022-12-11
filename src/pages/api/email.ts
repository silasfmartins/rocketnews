import { NextApiRequest, NextApiResponse } from "next";

import { createEmail } from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST") {
    const data = req.body;

    await createEmail(data)

    return res.status(201).json({});
  }

  return res.status(404).json({message: 'Route not found.'})
}
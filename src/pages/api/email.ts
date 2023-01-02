import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../lib/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "POST") {
    const { email } = req.body

    const emails = await prismaClient.emails.create({
      data: {
        email,
      }
    });

    return res.status(201).json({
      data: emails,
    });
    
  } else if (method === "GET") {
    const emails = await prismaClient.emails.findMany()

    return res.status(200).json({
      data: emails,
    });
  }

  return res.status(404).json({message: 'Route not found.'})
}
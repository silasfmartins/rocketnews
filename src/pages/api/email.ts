import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../lib/prismaClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if(method === "POST") {
    const { email } = req.body

    await prismaClient.emails.create({
      data: {
        email,
      }
    });

    return res.status(201).json({});
    
  } else if (method === "GET") {
      const { email } = req.query;

      const emails = await prismaClient.emails.findMany({
        where: {
          id: {
            contains: String(email),
          }
        }
      })

    return res.json(emails);
  }

  return res.status(404).json({message: 'Route not found.'})
}
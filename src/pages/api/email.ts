import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../lib/prismaClient";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'POST') {
      const { email } = request.body;

    const emails = await prismaClient.emails.create({
      data: {
        email,
      }
    })

    return response.json(emails);
    }
  }
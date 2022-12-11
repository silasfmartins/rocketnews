import { prisma } from "./prisma";

export interface Email {
  id: number;
  email: string;
}

export async function getEmail() {
    const data = await prisma.emails.findMany()
    return data;
}

export async function createEmail(email: string) {
  await prisma.emails.create({
    data: {
      email,
    }
  });
}
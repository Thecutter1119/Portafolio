import { PrismaClient } from "@prisma/client";

let prismaInstance = null;
try {
  if (process.env.DATABASE_URL) {
    prismaInstance = new PrismaClient();
  }
} catch {}

export const prisma = prismaInstance;

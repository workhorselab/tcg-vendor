import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  __prisma?: PrismaClient;
};

if (globalForPrisma.__prisma) {
  globalForPrisma.__prisma.$disconnect().catch(() => {});
}

const prisma = createPrismaClient();
globalForPrisma.__prisma = prisma;

export default prisma;

import { PrismaClient } from "@prisma/client";

// Prevenir múltiplas instâncias no ambiente de desenvolvimento
// declare global {
//   // Somente no ambiente TypeScript
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"]
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export default db;

import { PrismaClient } from "@prisma/client";

// Prevenir múltiplas instâncias no ambiente de desenvolvimento
declare global {
  // Somente no ambiente TypeScript
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}

export default db;

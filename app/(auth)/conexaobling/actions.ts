"use server";
import db from "@/lib/db";

export async function getConexaoBling() {
  const conexoesbling = await db.clientBling.findMany();
  db.$disconnect();
  return conexoesbling;
}

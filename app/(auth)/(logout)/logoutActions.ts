"use server";

import { signOut } from "@/auth";

export default async function logoutActions() {
  // await signOut({ callbackUrl: "/" });
  await signOut();
}

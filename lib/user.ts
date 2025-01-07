import { compareSync } from "bcrypt-ts";
import db from "./db";

type User = {
  email: string;
  password: string;
  name: string;
};
export async function findUserByCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await db.user.findFirst({
    where: {
      email: email
    }
  });
  if (!user || !compareSync(password, user.password)) {
    return null;
  }
  return user;
}

import db from "./db";
import { compareSync } from "bcrypt-ts";

type User = {
  email: string;
  password?: string;
  name: string;
};
export async function findUserByCredentials({
  email,
  password
}: User): Promise<User | null> {
  const user = await db.user.findFirst({
    where: {
      email: email
      // password: password
    }
  });

  if (!user) {
    return null;
  }

  const passwordMatch = await compareSync(password, user.password);

  if (passwordMatch) {
    return { email: user.email, name: user.name };
  }
  return null;
}

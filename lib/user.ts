import { hashSync } from "bcrypt-ts";
import db from "./db";

type User = {
  email: string;
  password: string;
  name: string;
};
export async function findUserByCredentials({
  email,
  password
}: User): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      email: email
    }
  });
  console.log(email, password);
  if (!user || user.password !== password) {
    // if (!user || user.password !== hashSync(password)) {
    return null;
  }
  return user;
}

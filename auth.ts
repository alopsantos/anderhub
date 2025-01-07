import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUserByCredentials } from "./lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "eu@exemplo"
        },
        password: {
          label: "Senha",
          type: "password",
          placeholder: "********"
        }
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          user = await findUserByCredentials(
            credentials.email as string,
            credentials.password as string
          );

          return user;
        } catch (e) {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
});

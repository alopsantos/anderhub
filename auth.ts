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
            credentials.email,
            credentials.password
          );

          return user;
        } catch (e) {
          console.log(e);
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
});

// 0000000000000000000000000000006cecd634d268c0d4acb8a01f51eda7a4d8

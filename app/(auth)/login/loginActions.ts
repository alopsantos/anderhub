"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export default async function loginActions(
  _prevState: any,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: true,
      redirectTo: "/dashboard"
    });
    return { success: true };
  } catch (e: any) {
    if (isRedirectError(e)) {
      throw e;
    }
    if (e.type === "CredentialsSignin") {
      return {
        message: "Email ou senha incorretos",
        success: false
      };
    }
    return {
      message: `Ocorreu um erro ao fazer login ${e.message}`,
      success: false
    };
    console.log(e);
  }
}

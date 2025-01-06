"use server";
import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

export default async function registerActions(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  if (!data.name || !data.email || !data.password) {
    return {
      message: "Preencha todos os campos",
      success: false
    };
  }

  const user = await db.user.findUnique({
    where: {
      email: data.email
    }
  });

  if (user) {
    return {
      message: "Email já cadastrado",
      success: false
    };
  }

  await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashSync(data.password)
    }
  });

  return redirect("/");
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import Link from "next/link";
import RegisterForm from "./register-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getConexaoBling } from "./actions";

export default async function RegisterPage() {
  const conexaoBling = await getConexaoBling();
  const session = await auth();
  if (session) {
    return redirect("/blingapilista");
  }
  console.log(conexaoBling);
  return (
    <>
      <Card className="max-w-sm w-full rounded-2xl mt-12">
        <CardHeader>
          <h2 className="text-xl font-bold">Cadastro API Bling</h2>
          <CardDescription>Cadastro de acesso a api bling</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </>
  );
}

"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Form from "next/form";
import registerActions from "./registerActions";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerActions, null);

  return (
    <>
      {state?.success === false && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">X</div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{state.message}</p>
            </div>
          </div>
        </div>
      )}
      <Form action={formAction}>
        <div>
          <Label>Nome</Label>
          <Input type="text" name="name" placeholder="Fulano de Tal" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="eu@exemplo.com" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input type="password" name="password" placeholder="********" />
        </div>
        <div>
          <Button className="w-full mt-6 flex gap-4" type="submit">
            <div
              className="data-[loading=true]:animate-spin"
              data-loading={isPending}
            >
              O
            </div>
            Registrar
          </Button>
        </div>
      </Form>
    </>
  );
}

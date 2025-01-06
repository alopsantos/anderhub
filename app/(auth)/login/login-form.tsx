"use client";
import { useActionState } from "react";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import loginActions from "./loginActions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginActions, null);
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
            Login
          </Button>
        </div>
      </Form>
    </>
  );
}

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import * as z from "zod";

import { Input } from "../components/form/Input";
import { Button } from "../components/Button";

type SignInFormData = {
  email: string;
  password: string;
};

const signInSchema = z.object({
  email: z.email("E-mail inválido").toLowerCase(),
  password: z.string("Senha obrigatória").nonempty("Senha obrigatória"),
});

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  function onSubmit(data: SignInFormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <div className="border border-gray-500 p-6 rounded-[.625rem]">
        <h1 className="text-xl text-gray-200 font-bold mb-[.125rem]">
          Acesse o portal
        </h1>
        <p className="text-sm text-gray-300">
          Entre usando seu e-mail e senha cadastrados
        </p>

        <div className="my-8 flex flex-col gap-4">
          <div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  label="e-mail"
                  type="email"
                  placeholder="exemplo@email.com"
                  {...field}
                />
              )}
            />

            {errors.email?.message && (
              <span className="text-feedback-danger flex items-center gap-1 mt-1">
                <CircleAlert size={16} color="#d03e3e" />
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  label="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                />
              )}
            />
            {errors.password?.message && (
              <span className="text-feedback-danger flex items-center gap-1 mt-1">
                <CircleAlert size={16} color="#d03e3e" />
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <Button type="submit">Entrar</Button>
      </div>

      <div className="border border-gray-500 p-6 rounded-[.625rem]">
        <h2 className="text-lg text-gray-200 font-bold mb-[.125rem]">
          Ainda não tem uma conta?
        </h2>

        <p className="text-sm text-gray-300 mb-[1.25rem]">
          Cadastre agora mesmo
        </p>

        <Button>Criar conta</Button>
      </div>
    </form>
  );
}

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { AxiosError } from "axios";
import * as z from "zod";

import { api } from "../../services/api";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/Button";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

const signUpSchema = z.object({
  name: z.string("Nome é obrigatório").trim().nonempty("Nome é obrigatório"),
  email: z.email("E-mail inválido").toLowerCase(),
  password: z.string("Senha obrigatória").nonempty("Senha obrigatória").min(6, "Senha deve ter no mínimo 6 dígitos"),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: SignUpFormData) {
    try {
      setIsLoading(true);
            
      await api.post("/users", data);
      navigate("/");

    } catch (error) {
      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      console.error(error);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <div className="border border-gray-500 p-6 rounded-[.625rem]">
        <h1 className="text-xl text-gray-200 font-bold mb-[.125rem]">
          Crie sua conta
        </h1>
        <p className="text-sm text-gray-300">
          Informe seu nome, e-mail e senha
        </p>

        <div className="my-8 flex flex-col gap-4">
          <div>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  label="nome"                  
                  placeholder="Digite o nome completo"
                  {...field}
                />
              )}
            />

            {errors.name?.message && (
              <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                <CircleAlert size={16} color="#d03e3e" />
                {errors.name.message}
              </span>
            )}
          </div>

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
              <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
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

            {errors.password?.message ? (
              <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                <CircleAlert size={16} color="#d03e3e" />
                {errors.password.message}
              </span>
            ) : (
              <span className="text-gray-400 flex items-center gap-1 mt-1.5 text-sm italic">
                Mínimo de 6 dígitos
              </span>
            )}
          </div>
        </div>

        <Button isLoading={isLoading} type="submit">Cadastrar</Button>
      </div>

      <div className="border border-gray-500 p-6 rounded-[.625rem]">
        <h2 className="text-lg text-gray-200 font-bold mb-[.125rem]">
          Já tem uma conta?
        </h2>

        <p className="text-sm text-gray-300 mb-[1.25rem]">
          Entre agora mesmo
        </p>

        <Button styleVariant="link" onClick={() => navigate("/")}>
          Acessar conta
        </Button>
      </div>
    </form>
  );
}

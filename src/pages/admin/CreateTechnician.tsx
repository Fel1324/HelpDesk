import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, CircleAlert } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AxiosError } from "axios";
import * as z from "zod";

import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { FormLayout } from "../../components/layouts/FormLayout";
import { Input } from "../../components/form/Input";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";

type TechnicianFormData = {
  name: string;
  email: string;
  password: string;
  timeIds: number[];
}

const technicianSchema = z.object({
  name: z
    .string("Nome é obrigatório")
    .trim()
    .min(2, "Nome deve conter pelo menos 2 caracteres!"),
  email: z
    .email("E-mail inválido, siga o modelo: email@example.com")
    .toLowerCase(),
  password: z
    .string("Senha é obrigatória")
    .min(6, "Senha deve conter pelo menos 6 caracteres"),
  timeIds: z.array(
    z
      .int("Horário inválido! Horários disponíveis: 07:00 até 23:00")
      .positive("Horário inválido! Horários disponíveis: 07:00 até 23:00")
  ),
})

export function CreateTechnician() {
  const { session } = useAuth();
  const token = session?.token;

  const navigate = useNavigate();
  const [technicianTimes, setTechnicianTimes] = useState([]);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<TechnicianFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      timeIds: [],
    },
    resolver: zodResolver(technicianSchema),
  })

  async function fetchTechnicianTimes() {
    try {
      const resp = await api.get("/times", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível carregar os horários!");
    }
  }

  return (
    <div className="max-w-[55rem] mx-auto">
      <form>
        <header className="md:flex items-center justify-between">
          <div>
            <Link
              className="text-xs font-bold text-gray-300 flex items-center gap-2 mb-1 w-fit" to="/technicians">
              <ArrowLeft size={14} color="#535964" />
              Voltar
            </Link>

            <Title className="mb-3 md:mb-0 lg:mb-0">Criar técnico</Title>
          </div>

          <div className="flex gap-2 md:mt-4.5">
            <Button onClick={() => navigate(-1)} styleVariant="buttonIcon" className="min-w-[7.625rem] md:min-w-[5.5rem]">
              Cancelar
            </Button>

            <Button styleVariant="buttonIcon" className="bg-gray-200 text-gray-600 md:min-w-[4.5rem]">
              Salvar
            </Button>
          </div>
        </header>

        <div className="mt-4 flex flex-col gap-4">
          <FormLayout>
            <fieldset>
              <legend className="text-base font-bold text-gray-200 mb-1">Dados pessoais</legend>
              <p className="text-xs text-gray-300">Defina as informações do perfil do técnico</p>

              <div className="mt-5 flex flex-col gap-4">
                <div>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        label="Nome"
                        placeholder="Nome completo"
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
                        label="E-mail"
                        placeholder="exemplo@mail.com"
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
                        label="Senha"
                        placeholder="Defina a senha de acesso"
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
            </fieldset>
          </FormLayout>

          <FormLayout>
            <fieldset>
              <legend className="text-base font-bold text-gray-200 mb-1">Horários de atendimento</legend>
              <p className="text-xs text-gray-300">Selecione os horários de disponibilidade do técnico para atendimento</p>
            </fieldset>
          </FormLayout>
        </div>
      </form>
    </div>
  )
}
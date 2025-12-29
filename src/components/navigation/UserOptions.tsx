import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowLeft, CircleAlert, CircleUser, LogOut } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAuth } from "../../hooks/useAuth";
import { Modal } from "../Modal";
import { UserAvatar } from "../UserAvatar";
import { Input } from "../form/Input";
import { Button } from "../Button";
import { AxiosError } from "axios";
import { api } from "../../services/api";

type ProfileFormData = {
  name: string;
  email: string;
}

type ChangePasswordFormData = {
  password: string;
  newPassword: string;
}

const profileSchema = z.object({
  name: z
    .string("Nome é obrigatório")
    .min(3, "Nome deve conter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido").toLowerCase()
});

const changePasswordSchema = z.object({
  password: z.string().nonempty("Senha atual é obrigatória"),
  newPassword: z
    .string("Nova senha é obrigatória")
    .min(6, "Senha deve conter pelo menos 6 caracteres"),  
});

export function UserOptions() {
  const { removeUser, session, saveUser } = useAuth();
  const user = session?.user;

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState<boolean>(false);

  const { register, handleSubmit, formState: {errors} } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || ""
    },
    resolver: zodResolver(profileSchema),
  });

  const { register: rePwdChange, handleSubmit: haPwdSubmit, formState: { errors: errPwd } } = useForm<ChangePasswordFormData>({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  })

  async function handleUpdateProfile(data: ProfileFormData) {
    try {
      await api.put(`/profiles/${user?.id}`, data, {
        headers: {
          "Authorization": `Bearer ${session?.token}`
        },
      });

      if(session && user) {
        saveUser({
          token: session.token,
          user: {
            avatar: user.avatar,
            id: user.id,
            role: user.role,
            name: data.name,
            email: data.email,
          },
        });
      }

      setIsProfileModalOpen(false);

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Erro ao atualizar perfil. Tente novamente mais tarde.");
    }
  }

  async function handleChangePassword(data: ChangePasswordFormData) {
    try {
      await api.patch(`/profiles/${user?.id}`, data, {
        headers: {
          "Authorization": `Bearer ${session?.token}`
        },
      });

      setIsPasswordChangeModalOpen(false);
      setIsProfileModalOpen(true);
      alert("Senha alterada com sucesso!");

    } catch (error) {
      console.error(error);

      if(error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Erro ao atualizar perfil. Tente novamente mais tarde.");      
    }
  }

  return (
    <aside className="min-w-[12.375rem] px-5 py-4 bg-gray-100 fixed top-[6.25rem] right-6 rounded-[.625rem] xl:top-auto xl:right-auto xl:left-[13rem] xl:bottom-2">
      <span className="uppercase text-xs text-gray-400 font-bold">Opções</span>

      <ul role="list" className="mt-4 text-base">
        {user?.role !== "admin" && (
          <li className="py-2">
            <button onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 text-gray-500 cursor-pointer"
            >
              <CircleUser size={20} color="#f9fafa" />
              Perfil
            </button>
          </li>
        )}

        <li className="py-2">
          <button onClick={removeUser} className="flex items-center gap-2 text-feedback-danger cursor-pointer">
            <LogOut size={20} color="#D03E3E" />
            Sair
          </button>
        </li>
      </ul>

      <Modal
        title="Perfil"
        isOpen={isProfileModalOpen}
        close={setIsProfileModalOpen}
        bodyContent={
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <div className="flex items-center gap-4">
              {user && (
                <UserAvatar className="w-12 h-12 text-xl" username={user?.name} />
              )}
            </div>

            <div className="mt-5 mb-7 flex flex-col gap-4">
              <div>
                <Input
                  label="Nome"
                  placeholder="Nome de usuário"
                  {...register("name")}
                />

                {errors.name?.message && (
                  <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                    <CircleAlert size={16} color="#d03e3e" />
                    {errors.name.message}
                  </span>
                )}                
              </div>

              <div>
                <Input
                  label="E-mail"
                  placeholder="E-mail de usuário"
                  type="email"
                  {...register("email")}
                />
                {errors.email?.message && (
                <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                    <CircleAlert size={16} color="#d03e3e" />
                    {errors.email.message}
                  </span>
                )}           
              </div>

              <div className="w-full flex flex-col text-gray-300 border-b border-gray-500">
                <label className="text-xs uppercase font-bold text-inherit tracking-wider">
                  Senha
                </label>

                <div className="flex">
                  <input
                    className="w-full h-[2.5rem] text-gray-200"
                    value="12345678"
                    type="password"
                    readOnly
                  />

                  <button
                    className="bg-gray-500 text-gray-200 h-7 px-2 text-xs font-bold rounded-md cursor-pointer"
                    type="button"
                    onClick={() => {
                      setIsPasswordChangeModalOpen(true)
                      setIsProfileModalOpen(false);
                    }}
                  >
                    Alterar
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit">Salvar</Button>
          </form>
        }
      />

      <Modal
        title="Alterar senha"
        isOpen={isPasswordChangeModalOpen}
        close={setIsPasswordChangeModalOpen}
        bodyContent={
          <form onSubmit={haPwdSubmit(handleChangePassword)}>
            <button onClick={() => {
              setIsPasswordChangeModalOpen(false);
              setIsProfileModalOpen(true);
            }}
              type="button"
              className="text-xs flex items-center gap-1 cursor-pointer mb-4"
            >
              <ArrowLeft size={14} color="#535964" />
              Voltar
            </button>

            <div className="mb-7 flex flex-col gap-4">
              <div>
                <Input
                  label="Senha atual"
                  placeholder="Digite sua senha atual"
                  type="password"
                  {...rePwdChange("password")}
                />

                {errPwd.password?.message && (
                  <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                    <CircleAlert size={16} color="#d03e3e" />
                    {errPwd.password.message}
                  </span>
                )}                
              </div> 

              <div>
                <Input
                  label="Nova senha"
                  placeholder="Digite sua nova senha"
                  type="password"
                  {...rePwdChange("newPassword")}
                />

                {errPwd.newPassword?.message && (
                  <span className="text-feedback-danger flex items-center gap-1 mt-1.5 text-sm">
                    <CircleAlert size={16} color="#d03e3e" />
                    {errPwd.newPassword.message}
                  </span>
                )}                
              </div>                          
            </div>

            <Button type="submit">Salvar</Button>
          </form>
        }
      />      
    </aside>
  )
}

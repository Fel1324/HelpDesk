import { Input } from "../components/form/Input";
import { Button } from "../components/Button";

export function SignIn() {
  return (
    <form className="w-full flex flex-col gap-3">
      <div className="border border-gray-500 p-6 rounded-[.625rem]">
        <h1 className="text-xl text-gray-200 font-bold mb-[.125rem]">
          Acesse o portal
        </h1>
        <p className="text-sm text-gray-300">
          Entre usando seu e-mail e senha cadastrados
        </p>

        <div className="my-8 flex flex-col gap-4">
          <div>
            <Input
              required
              label="e-mail"
              type="email"
              placeholder="exemplo@email.com"
            />

            <span></span>
          </div>

          <div>
            <Input
              required
              label="senha"
              type="password"
              placeholder="Digite sua senha"
            />

            <span></span>
          </div>
        </div>

        <Button>
          Entrar
        </Button>
      </div>

      <div className="border border-gray-500 p-6 rounded-[.625rem]">
        <h2 className="text-lg text-gray-200 font-bold mb-[.125rem]">
          Ainda não tem uma conta?
        </h2>

        <p className="text-sm text-gray-300 mb-[1.25rem]">
          Cadastre agora mesmo
        </p>

        <Button>
          Criar conta
        </Button>
      </div>
    </form>
  );
}

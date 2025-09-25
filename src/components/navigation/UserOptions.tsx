import { useAuth } from "../../hooks/useAuth";

import { CircleUser, LogOut } from "lucide-react";

export function UserOptions() {
  const { removeUser } = useAuth();

  return (
    <aside className="min-w-[12.375rem] px-5 py-4 bg-gray-100 fixed top-[6.25rem] right-6 rounded-[.625rem]">
      <span className="uppercase text-xs text-gray-400 font-bold">Opções</span>

      <ul role="list" className="mt-4 text-base">
        <li className="py-2">
          <button className="flex items-center gap-2 text-gray-500 cursor-pointer">
            <CircleUser size={20} color="#f9fafa" />
            Perfil
          </button>
        </li>

        <li className="py-2">
          <button onClick={removeUser} className="flex items-center gap-2 text-feedback-danger cursor-pointer">
            <LogOut size={20} color="#D03E3E" />
            Sair
          </button>
        </li>
      </ul>
    </aside>
  )
}

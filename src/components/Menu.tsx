import { useAuth } from "../hooks/useAuth";

import { TextAlignJustify } from "lucide-react";

import { UserOptions } from "./UserOptions";
import logo from "../assets/logo.svg";
import { useState } from "react";

export function Menu() {
  const [isOpenUserOptions, setIsOpenUserOptions] = useState(false);

  const { session } = useAuth();

  const user = session?.user;
  const userWithoutAvatar = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase();

  const userRoles = {
    admin: "admin",
    technician: "técnico",
    customer: "cliente",
  };

  return (
    <>
      <aside className="bg-gray-100 p-6 fixed top-0 left-0 w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md">
            <TextAlignJustify size={20} color="#f9fafa" />
          </button>

          <div className="flex items-center gap-3">
            <img src={logo} alt="Help Desk logo" className="" />

            <div className="flex flex-col">
              <span className="text-gray-600 font-bold text-xl">HelpDesk</span>

              {user &&
                <small className="text-xs uppercase text-blue-light">
                  {userRoles[user?.role]}
                </small>
              }
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsOpenUserOptions(!isOpenUserOptions)} 
          className="w-10 h-10 rounded-4xl bg-blue-dark flex items-center justify-center"
          title="Opções do usuário"
        >
          { user?.avatar ? (
            <span>XY</span>
          ) : (            
            <span className="text-gray-600">{userWithoutAvatar}</span>
          )}
        </button>
      </aside>

      { isOpenUserOptions && <UserOptions /> }
    </>
  )
}
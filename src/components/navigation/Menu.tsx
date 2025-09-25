import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { TextAlignJustify, X } from "lucide-react";

import { UserOptions } from "./UserOptions";
import { Navbar } from "./Navbar";

import logo from "../..//assets/logo.svg";

export function Menu() {
  const [isOpenUserOptions, setIsOpenUserOptions] = useState(false);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

  const { pathname } = useLocation();

  const { session } = useAuth();
  const user = session?.user;
  const userWithoutAvatar = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase();

  const userRoles = {
    admin: "admin",
    technician: "técnico",
    customer: "cliente",
  };

  useEffect(() => {
    setIsOpenSideMenu(false);
  }, [pathname])

  return (
    <>
      <aside className="bg-gray-100 p-6 fixed top-0 left-0 w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsOpenSideMenu(!isOpenSideMenu)
              setIsOpenUserOptions(false)
            }}
            className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-md cursor-pointer"
          >
            {isOpenSideMenu ? (
              <X size={20} color="#F9FAFA" />
            ): (
              <TextAlignJustify size={20} color="#f9fafa" />
            )}
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
          onClick={() => {
            setIsOpenUserOptions(!isOpenUserOptions)
            setIsOpenSideMenu(false)
          }} 
          className="w-10 h-10 rounded-4xl bg-blue-dark flex items-center justify-center cursor-pointer"
          title="Opções do usuário"
        >
          { user?.avatar ? (
            <span>XY</span>
          ) : (            
            <span className="text-gray-600">{userWithoutAvatar}</span>
          )}
        </button>
      </aside>

      {isOpenSideMenu && (
        <aside className="min-w-[20.4375rem] px-5 py-4 bg-gray-100 fixed top-[6.25rem] left-6 rounded-[.625rem]">
          <span className="uppercase text-xs text-gray-400 font-bold">Menu</span>

          <Navbar />
        </aside>
      )}

      {isOpenUserOptions && <UserOptions />}
    </>
  )
}
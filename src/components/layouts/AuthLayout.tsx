import { Outlet } from "react-router";

import authLogo from "../../assets/auth-logo.svg";

export function AuthLayout() {
  return (
    <div className="bg-[url(/src/assets/imgs/auth-bg.jpg)] bg-cover bg-no-repeat bg-bottom w-full h-auto min-h-screen pt-8">
      <main className="bg-gray-600 px-6 pt-8 pb-6 rounded-t-[1.25rem] flex flex-col gap-6 items-center h-auto min-h-[calc(100vh-2rem)] max-w-[425px] mx-auto">
        <img src={authLogo} alt="Logo HelpDesk" />
        <Outlet />
      </main>
    </div>
  );
}

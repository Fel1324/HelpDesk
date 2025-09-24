import { Outlet } from "react-router";
import { Menu } from "../Menu";

export function AppLayout() {
  return (
    <div className="bg-gray-100 min-h-screen h-auto flex">
      <Menu />

      <main className="bg-gray-600 pt-7 pb-6 px-6 w-full h-auto min-h-[calc(100vh-5.75rem)] self-end rounded-t-[1.25rem]">
        <Outlet />
      </main>
    </div>
  )
}
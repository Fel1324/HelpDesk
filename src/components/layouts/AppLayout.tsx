import { Outlet } from "react-router";
import { Menu } from "../navigation/Menu";

export function AppLayout() {
  return (
    <div className="bg-gray-100 min-h-screen h-auto flex lg:justify-end">
      <Menu />

      <main className="bg-gray-600 pt-7 pb-6 px-6 w-full h-auto min-h-[calc(100vh-5.75rem)] self-end rounded-t-[1.25rem] lg:min-h-[calc(100vh-0.75rem)] lg:rounded-t-none lg:rounded-tl-[1.25rem] lg:w-[calc(100%-12.5rem)] lg:px-12 lg:pb-12 lg:py-13">
        <Outlet />
      </main>
    </div>
  )
}
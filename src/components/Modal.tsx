import { X } from "lucide-react";

type Props = React.ComponentProps<"div"> & {
  title: string;
  isOpen: boolean;
  close: (state: boolean) => void;
  bodyContent: React.ReactNode;
  buttons: React.ReactNode;
}

export function Modal({ title, isOpen, close, bodyContent, buttons }: Props) {
  if(isOpen) {
    return (
      <>
        <div onClick={() => close(false)} className="fixed inset-0 bg-overlay"></div>

        <aside className="fixed top-1/2 left-1/2 translate-[-50%] w-[22.375rem] bg-gray-600 rounded-[.625rem] md:w-[27.5rem]">
          <div className="flex items-center justify-between py-5 px-7">
            <h2 className="text-base font-bold text-gray-200">{title}</h2>
            <button className="w-6 h-6 flex items-center justify-center cursor-pointer" onClick={() => close(false)}>
              <X size={18} color="#535964" />
            </button>
          </div>
  
          <div className="pt-7 pb-8 border-y border-gray-500">
            {bodyContent}
          </div>
  
          <div className="py-6 px-7">
            {buttons}
          </div>
        </aside>
      </>
    )
  }
}
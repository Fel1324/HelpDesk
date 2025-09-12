export function FormLayout({ children }: { children: React.ReactNode}) {
  return (
    <div className="border border-gray-500 p-6 rounded-[.625rem] lg:p-7">
      {children}
    </div>
  );
}

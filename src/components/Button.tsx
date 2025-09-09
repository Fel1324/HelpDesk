type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
};

export function Button({
  children,
  isLoading,
  type = "button",
  ...rest
}: Props) {
  return (
    <button 
      type={type}
      disabled={isLoading}
      className="w-full h-[2.5rem] bg-gray-200 text-gray-600 rounded-md font-bold hover:bg-gray-100 disabled:cursor-progress"
      {...rest}
    >
      {children}
    </button>
  );
}

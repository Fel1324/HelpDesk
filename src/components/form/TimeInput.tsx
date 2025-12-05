type Props = React.ComponentProps<"input"> & {
  label: string;
}

export function TimeInput({ label, ...rest }: Props) {
  return (
    <li className="relative border-1 text-gray-200 border-gray-400 w-[3.375rem] h-7 text-center rounded-4xl has-checked:bg-blue-base has-checked:border-blue-base has-checked:text-gray-600">
      <input
        className="appearance-none outline-none cursor-pointer absolute inset-0"
        id={label}
        type="checkbox"
        {...rest}
      />
      <label className="text-xs font-bold px-1.5" htmlFor={label}>{label}</label>
    </li>
  )
}

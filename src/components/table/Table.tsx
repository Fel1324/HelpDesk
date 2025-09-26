type Props = React.ComponentProps<"table">;

export function Table({ ...rest }: Props) {
  return (
    <div className="w-full overflow-auto rounded-[.625rem] border-1 border-gray-500">
      <table className="w-[375px] whitespace-nowrap lg:w-full" {...rest} />
    </div>
  )
}

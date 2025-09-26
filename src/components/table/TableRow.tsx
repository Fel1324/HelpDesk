import { classMerge } from "../../utils/classMerge";

type Props = React.ComponentProps<"tr">;

export function TableRow({ className, ...rest }: Props) {
  return (
    <tr
      className={classMerge([
        "h-16 border-b-1 border-gray-500",
        className
      ])}
      {...rest}
    />
  )
}
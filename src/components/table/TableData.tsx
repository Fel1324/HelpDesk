import { classMerge } from "../../utils/classMerge";

type Props = React.ComponentProps<"td">;

export function TableData({ className, ...rest }: Props) {
  return (
    <td
      className={classMerge([
        "px-3 text-gray-200",
        className
      ])}
      {...rest}
    />
  )
}
import { classMerge } from "../utils/classMerge";

type Props = React.ComponentProps<"div"> & {
  username: string;
  avatarUrl?: string;
}

export function UserAvatar({ username, avatarUrl, className, ...rest}: Props) {
  const userWithoutAvatar = username?.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();

  return (
    <div className={classMerge([
        "w-5 h-5 rounded-4xl bg-blue-dark flex items-center justify-center cursor-pointer text-xs",
        className
      ])}
     {...rest}
     >
      { avatarUrl ? (
        <span>XY</span>
      ) : (
        <span className="text-gray-600">{userWithoutAvatar}</span>
      )}
    </div>
  )
}
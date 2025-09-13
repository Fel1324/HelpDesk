import { useAuth } from "../../hooks/useAuth";

export function Tickets() {
  const { removeUser } = useAuth();

  return (
    <div>
      Cliente <br />
      <button onClick={removeUser}>LOG OUT</button>
    </div>
  );
}
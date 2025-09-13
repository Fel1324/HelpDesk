import { useAuth } from "../../hooks/useAuth";

export function TicketsList() {
  const { removeUser } = useAuth();

  return (
    <div>
      admin <br />
      <button onClick={removeUser}>LOG OUT</button>
    </div>
  );
}
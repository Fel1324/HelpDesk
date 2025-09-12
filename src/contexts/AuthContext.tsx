import { useState } from "react";
import { createContext } from "react";

type AuthContext = {
  session: null | UserAPIResp;
  save: (data: UserAPIResp) => void;
}

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserAPIResp | null>(null);

  function save(data: UserAPIResp) {
    setSession(data);
  }

  return (
    <AuthContext.Provider value={{ session, save }}>
      {children}
    </AuthContext.Provider>
  )
}

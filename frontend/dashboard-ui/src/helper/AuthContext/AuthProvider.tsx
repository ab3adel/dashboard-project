import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../interfaces";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = ({ accessToken, user }: any) => {
    localStorage.setItem('accessToken', accessToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

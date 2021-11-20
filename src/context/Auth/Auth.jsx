import React, { useState } from "react";

const parseLocalStorage = () => {
  const token = localStorage.getItem("token");
  try {
    return JSON.parse(token);
  } catch (error) {
    return null;
  }
};

export const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
  const [accessToken, setToken] = useState(parseLocalStorage());
  return <AuthContext.Provider value={{ accessToken: parseLocalStorage(), setToken }}>{children}</AuthContext.Provider>;
}

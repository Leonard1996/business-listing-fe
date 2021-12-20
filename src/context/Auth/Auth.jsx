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
  const [mapState, setMapState] = useState({
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 6,
    height: 400,
    mapPosition: {
      lat: 51.5072,
      lng: 0.1276,
    },
    markerPosition: {
      lat: 51.5072,
      lng: 0.1276,
    },
  });

  return (
    <AuthContext.Provider value={{ accessToken: parseLocalStorage(), setToken, mapState, setMapState }}>
      {children}
    </AuthContext.Provider>
  );
}

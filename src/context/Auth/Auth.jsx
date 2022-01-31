import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
  const history = useHistory();
  const parseLocalStorage = () => {
    const token = localStorage.getItem("token");
    try {
      return JSON.parse(token);
    } catch (error) {
      localStorage.clear();
      window.location.href = "/";
      return null;
    }
  };
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

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <AuthContext.Provider
      value={{ accessToken: parseLocalStorage(), setToken, mapState, setMapState, openDrawer, setOpenDrawer }}
    >
      {children}
    </AuthContext.Provider>
  );
}

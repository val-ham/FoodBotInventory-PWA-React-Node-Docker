import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { logoutCall, loginCall } from "../apiCalls";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));
  const login = async (inputs) => {
    const res = await loginCall(inputs);
    setCurrentUser(res.data);
  };
  const logout = async () => {
    await logoutCall();
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
};

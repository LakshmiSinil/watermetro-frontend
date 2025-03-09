import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosInstance";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res?.data?.user;
    },
    retry:false
  });
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

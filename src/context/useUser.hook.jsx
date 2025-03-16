import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosInstance";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: user,isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await api.get("/users/me");
        return res?.data?.user;
      } catch (error) {
        return null
      }
    },
    
    retry:false
  });
  return (
    <UserContext.Provider value={{ user,isLoading }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

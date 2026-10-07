"use client";

import { createContext, useContext } from "react";

import { useGetMe, useLogout } from "@/hooks/useUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const guestCartId =
    typeof window !== "undefined" ? localStorage.getItem("guestCartId") : null;

  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { mutate: logoutUser, isLoading: logoutIsLoading } = useLogout();

  return (
    <UserContext.Provider
      value={{
        guestCartId,
        user,
        userIsLoading,
        logoutUser,
        logoutIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

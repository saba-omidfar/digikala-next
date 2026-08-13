"use client";

import { createContext, useContext } from "react";

import { useGetMe, useLogout, useGetFavorites } from "@/hooks/useUser";
import {
  useCreateList,
  useAddProductToWishlist,
  useGetAllUserList,
} from "@/hooks/useWishlist";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const guestCartId =
    typeof window !== "undefined" ? localStorage.getItem("guestCartId") : null;

  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { mutate: logoutUser, isLoading: logoutIsLoading } = useLogout();
  const { mutate: createWishlist } = useCreateList();
  const { mutate: addProductToWishlist } = useAddProductToWishlist();
  const { data: userLists, isLoading: userListsIsLoading } =
    useGetAllUserList();

  const { data: favoriteProducts, isLoading: isLoadingFavoriteProducts } =
    useGetFavorites();

  return (
    <UserContext.Provider
      value={{
        guestCartId,
        user,
        userIsLoading,
        logoutUser,
        logoutIsLoading,
        createWishlist,
        addProductToWishlist,
        userLists,
        userListsIsLoading,
        favoriteProducts,
        isLoadingFavoriteProducts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

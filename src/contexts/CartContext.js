"use client";

import { useState, createContext, useContext } from "react";

import {
  useAddProductToCart,
  useGetUserCart,
  useRemoveProductFromCart,
  useToggleInsurance,
  useAddToNextCart,
  useRemoveFromNextCart,
  useAddPlan,
  useRemovePlan,
} from "@/features/cart/hooks/useCart";

import recalcCartPrices from "@/utils/recalcCartPrices";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("next-cart");
  const [selectedInsurance, setSelectedInsurance] = useState(false);
  const [loadingVariantId, setLoadingVariantId] = useState(null);

  const guestCartId =
    typeof window !== "undefined" ? localStorage.getItem("guestCartId") : null;

  const { data: userCart, isLoading: isLoadingUserCart } =
    useGetUserCart(guestCartId);

  const { cart, basket, nextPurchaseBasket } = recalcCartPrices(userCart?.cart);

  const { mutate: addProductToCart, isLoading: addProductToCartIsLoading } =
    useAddProductToCart();

  const { mutate: toggleInsurance, isLoading: isLoadingToggleInsurance } =
    useToggleInsurance();

  const { mutate: addToNextCart, isLoading: isLoadingAddToNextCart } =
    useAddToNextCart();

  const { mutate: removeFromNextCart, isLoading: isLoadingRemoveFromNextCart } =
    useRemoveFromNextCart();

  const {
    mutate: removeProductFromCart,
    isLoading: removeProductFromCartIsLoading,
  } = useRemoveProductFromCart();

  const { mutate: addPlan, isLoading: isLoadingActivePlan } = useAddPlan();
  const { mutate: removePlan, isLoading: isLoadingRemovePlan } =
    useRemovePlan();

  return (
    <CartContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userCart,
        isLoadingUserCart,
        selectedInsurance,
        setSelectedInsurance,
        cart,
        basket,
        nextPurchaseBasket,
        addProductToCart,
        addProductToCartIsLoading,
        removeProductFromCart,
        removeProductFromCartIsLoading,
        addToNextCart,
        isLoadingAddToNextCart,
        loadingVariantId,
        setLoadingVariantId,
        removeFromNextCart,
        isLoadingRemoveFromNextCart,
        toggleInsurance,
        isLoadingToggleInsurance,
        addPlan,
        isLoadingActivePlan,
        removePlan,
        isLoadingRemovePlan,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

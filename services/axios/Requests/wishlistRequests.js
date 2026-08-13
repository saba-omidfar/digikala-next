import api from "../Configs/config";
import { addProductToWishlistError } from "@/services/axios/ErrorHandlers/wishlistErrors";

export async function createList({ title, description, color_or_size }) {
  const res = await api.post("/wishlist", {
    title,
    description,
    color_or_size,
  });
  return res.data;
}

export async function addProductToWishlist({ wishlistId, productId }) {
  try {
    const res = await api.put(`/wishlist/add-product`, {
      wishlistId,
      productId,
    });
    return res.data.data;
  } catch (error) {
    const message = addProductToWishlistError(error);
    throw new Error(message);
  }
}

export async function getAllUserList() {
  const res = await api.get(`/user/wishlist`);
  return res.data.data;
}

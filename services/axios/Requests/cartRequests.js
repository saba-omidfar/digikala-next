import api from "@/services/axios/Configs/config";

export async function getUserCart(guestCartId) {
  const query = guestCartId ? `?guestCartId=${guestCartId}` : "";
  const res = await api.get(`/cart${query}`);

  return res.data;
}

export async function addProductToCart({
  guestCartId,
  productId,
  variantId,
  quantity,
  hasInsurance,
  fromNextCart = false,
  moveAll = false,
}) {
  const res = await api.post("/cart/add", {
    guestCartId,
    productId,
    variantId,
    quantity,
    hasInsurance,
    fromNextCart,
    moveAll,
  });

  return res.data;
}

export async function removeProductFromCart({ guestCartId, variantId }) {
  const res = await api.delete("/cart/remove", {
    data: {
      guestCartId,
      variantId,
    },
  });

  return res.data.data;
}

export async function removeCart(guestCartId) {
  const res = await api.delete("/cart/clear", {
    params: {
      guestCartId,
    },
  });

  return res.data;
}

export async function getNextCart(guestCartId) {
  const query = guestCartId ? `?guestCartId=${guestCartId}` : "";

  const res = await api.get(`/cart/next${query}`);

  return res.data;
}

export async function addToNextCart({
  guestCartId,
  variantId,
  moveAll = false,
}) {
  const res = await api.post("/cart/next/add", {
    guestCartId,
    variantId,
    moveAll,
  });

  return res.data;
}

export async function removeFromNextCart({
  guestCartId,
  variantId,
  removeAll = false,
}) {
  const res = await api.post("/cart/next/remove", {
    guestCartId,
    variantId,
    removeAll,
  });

  return res.data;
}

export async function toggleInsurance({
  guestCartId,
  productId,
  variantId,
  hasInsurance,
}) {
  const res = await api.patch("/cart/insurance", {
    guestCartId,
    productId,
    variantId,
    hasInsurance,
  });

  return res.data;
}

export async function addPlusPlan({ guestCartId, plan }) {
  const res = await api.post("/cart/add-plus", {
    guestCartId,
    plan,
  });

  return res.data;
}

export async function removePlusPlan({ guestCartId }) {
  const res = await api.delete("/cart/remove-plus", {
    data: {
      guestCartId,
    },
  });

  return res.data;
}

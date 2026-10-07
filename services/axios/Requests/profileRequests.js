import api from "@/services/axios/Configs/config";

export async function addAddress(address) {
  const res = await api.post("/profile/address/add", address);

  return res.data;
}

export async function removeAddress(address) {
  const res = await api.post("/profile/address/remove", {
    id: address.id,
  });

  return res.data;
}

export async function editAddress(address) {
  const res = await api.post("/profile/address/edit", address);

  return res.data;
}

export async function getAddresses() {
  const res = await api.get("/profile/address/all");

  return res.data;
}

export async function setDefaultAddress(addressId) {
  const res = await api.patch("/profile/address/default", {
    addressId,
  });

  return res.data;
}

// PUBLIC-LIST

export async function getPublicList({ page }) {
  const params = new URLSearchParams();

  params.set("page", page);

  const res = await api.get(`/profile/public-list/?${params.toString()}`);

  return res.data.data;
}

// WISHLIST

export async function getUserWishlists() {
  const res = await api.get("/profile/wishlist");

  return res.data.data;
}

export async function getWishlistDetails({ wishlistCode, page, sort }) {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("sort", sort);
  params.set("wishListCode", wishlistCode);

  const res = await api.get(
    `/profile/public-list/${wishlistCode}/?${params.toString()}`,
  );

  return res.data.data;
}

export async function createWishlist(data) {
  const res = await api.post("/profile/wishlist/create", data);

  return res.data;
}

export async function addProductToWishlist({
  wishlistId,
  productId,
  imageUrl,
}) {
  const res = await api.post("/profile/wishlist/add-product", {
    wishlistId,
    productId,
    imageUrl,
  });

  return res.data;
}

export async function updateWishlist({
  wishlistCode,
  title,
  description,
  color_or_size,
}) {
  const res = await api.post(`/profile/wishlist/${wishlistCode}/edit`, {
    title,
    description,
    color_or_size,
  });

  return res.data;
}

export async function removeWishlist(wishlistCode) {
  const res = await api.post(`/profile/wishlist/${wishlistCode}/remove`);

  return res.data;
}

export async function removeWishlistProduct({ wishlistId, productId }) {
  const res = await api.post("/profile/wishlist/remove-product", {
    wishlistId,
    productId,
  });

  return res.data;
}

// FAVORITES

export async function getFavoriteProducts({ activeTab, page, sort }) {
  const { data } = await api.get("/profile/favorite-products", {
    params: {
      activeTab,
      page,
      sort,
    },
  });

  return data;
}

export async function addFavoriteProduct(productId) {
  const res = await api.post("/profile/favorite-products/add-product", {
    productId,
  });

  return res.data;
}

export async function removeFavoriteProduct(productId) {
  const res = await api.post("/profile/favorite-products/remove-product", {
    productId,
  });

  return res.data;
}

// OBSERVED

export async function getObservedProducts({ activeTab, page }) {
  const { data } = await api.get("/profile/observed-products", {
    params: {
      activeTab,
      page,
    },
  });

  return data;
}

export async function addObservedProduct({
  productId,
  send_sms,
  send_email,
  send_notification,
}) {
  const res = await api.post("/profile/observed-products/add", {
    productId,
    send_sms,
    send_email,
    send_notification,
  });

  return res.data;
}

export async function removeObservedProduct(productId) {
  const res = await api.post("/profile/observed-products/remove", {
    productId,
  });

  return res.data;
}

// RECENT-VIEWED

export async function getRecentViewedProducts() {
  const res = await api.get("/profile/recent-viewed");

  return res.data;
}

export async function addRecentViewedProduct(productId) {
  const res = await api.post(`/product/${productId}/recent-viewed/add`);

  return res.data;
}

export async function removeRecentViewedProduct(productId) {
  const res = await api.post(`/product/${productId}/recent-viewed/remove`);

  return res.data;
}

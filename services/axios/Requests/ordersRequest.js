import api from "@/services/axios/Configs/config";

export async function getOrders({ activeTab, page }) {
  const params = new URLSearchParams({
    activeTab,
    page: String(page),
  });

  const { data } = await api.get(`/profile/orders?${params}`);

  return data;
}

export async function getOrdersTabs() {
  const { data } = await api.get("/profile/orders/tabs");

  return data;
}

export async function getReturns({ activeTab, page }) {
  const params = new URLSearchParams({
    activeTab,
    page: String(page),
  });

  const { data } = await api.get(`/profile/returns?${params}`);

  return data;
}

export async function getOrderDetails(orderId) {
  const { data } = await api.get(`/profile/orders/${orderId}`);

  return data;
}

export async function reorderItems(orderId) {
  const { data } = await api.post("/profile/orders/reorder", {
    orderId,
  });

  return data;
}

export async function searchOrders({ activeTab, q, page = 1 }) {
  const params = new URLSearchParams({
    activeTab,
    q,
    search: "true",
    page: String(page),
  });

  const { data } = await api.get(`/profile/order/search?${params.toString()}`);

  return data;
}

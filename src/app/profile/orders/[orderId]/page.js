import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import OrderDetailsPage from "@/features/profile/pages/OrderDetailsPage";
import ProfileOrderDetails from "@/features/profile/sections/profileOrderDetails/ProfileOrderDetails";

import { getLoginUrl } from "@/utils/getLoginUrl";

export default async function Page({ searchParams, params }) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  const { orderId } = await params;

  if (!accessToken) {
    const params = await searchParams;

    const queryString = new URLSearchParams(params).toString();

    const currentUrl = queryString
      ? `/profile/orders/${orderId}?${queryString}`
      : `/profile/orders/${orderId}`;

    redirect(getLoginUrl(currentUrl));
  }

  return (
    <OrderDetailsPage>
      <ProfileOrderDetails orderId={orderId} />
    </OrderDetailsPage>
  );
}

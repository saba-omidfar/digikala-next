import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import WishlistPage from "@/features/profile/pages/WishlistPage";
import WishlistDetails from "@/features/profile/sections/wishlistDetails/WishlistDetails";

import { getLoginUrl } from "@/utils/getLoginUrl";

export default async function Page({ params, searchParams }) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  const { wishlistCode } = await params;

  if (!accessToken) {
    const paramsObject = await searchParams;

    const queryString = new URLSearchParams(paramsObject).toString();

    const currentUrl = queryString
      ? `/profile/wishlist/${wishlistCode}/details?${queryString}`
      : `/profile/wishlist/${wishlistCode}/details`;

    redirect(getLoginUrl(currentUrl));
  }

  return (
    <WishlistPage>
      <WishlistDetails wishlistCode={wishlistCode} />
    </WishlistPage>
  );
}

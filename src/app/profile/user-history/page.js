import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import UserHistoryPage from "@/features/profile/pages/UserHistoryPage";
import ProfileUserHistory from "@/features/profile/sections/profileUserHistory/ProfileUserHistory";

import { getLoginUrl } from "@/utils/getLoginUrl";

export default async function Page({ searchParams }) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  if (!accessToken) {
    const params = await searchParams;

    const queryString = new URLSearchParams(params).toString();

    const currentUrl = queryString ? `/profile?${queryString}` : "/profile";

    redirect(getLoginUrl(currentUrl));
  }

  return (
    <UserHistoryPage>
      <ProfileUserHistory />
    </UserHistoryPage>
  );
}

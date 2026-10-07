import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ProfilePage from "@/features/profile/pages/ProfilePage";
import ProfileOverview from "@/features/profile/sections/profileOverview/ProfileOverview";

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
    <ProfilePage>
      <ProfileOverview />
    </ProfilePage>
  );
}

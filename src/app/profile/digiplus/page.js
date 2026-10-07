import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import PlusPage from "@/features/profile/pages/PlusPage";
import ProfilePlus from "@/features/profile/sections/profilePlus/ProfilePlus";

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
    <PlusPage>
      <ProfilePlus />
    </PlusPage>
  );
}

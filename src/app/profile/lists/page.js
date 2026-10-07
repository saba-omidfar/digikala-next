import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ListsPage from "@/features/profile/pages/ListsPage";
import ProfileLists from "@/features/profile/sections/profileLists/ProfileLists";

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
    <ListsPage>
      <ProfileLists />
    </ListsPage>
  );
}

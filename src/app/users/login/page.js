import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import LoginPage from "@/features/users/pages/login/LoginPage";

export default async function Page() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  if (accessToken) {
    redirect("/");
  }

  return <LoginPage />;
}

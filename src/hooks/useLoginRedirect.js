"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

import { getCurrentUrl, getLoginUrl } from "@/utils/getLoginUrl";

export default function useLoginRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentUrl = getCurrentUrl(pathname, searchParams);
  const loginUrl = getLoginUrl(currentUrl);

  const redirectToLogin = () => {
    router.push(loginUrl);
  };

  return {
    currentUrl,
    loginUrl,
    redirectToLogin,
  };
}

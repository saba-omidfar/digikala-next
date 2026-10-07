"use client";
import { useRouter } from "nextjs-toploader/app";

import ProfileMobile from "@/features/profile/mobile/ProfileMobile";
import ProfileDesktop from "@/features/profile/desktop/ProfileDesktop";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "../mobile/profileMobile.module.css";

export default function WishlistPage({ children }) {
  const router = useRouter();

  const { isSmallScreen, isClientReady } = useScreenStatus();

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <ProfileMobile>{children}</ProfileMobile>
  ) : (
    <ProfileDesktop>{children}</ProfileDesktop>
  );
}

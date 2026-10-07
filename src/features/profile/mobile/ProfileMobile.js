"use client";

import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";
import ProfileContent from "@/features/profile/sections/profileContent/ProfileContent";

export default function ProfileMobile({ children }) {
  return (
    <div className="d-flex flex-column bg-white h-100">
      <div
        className="d-flex flex-column flex-grow-1"
        style={{ paddingBottom: 55 }}
      >
        <ProfileContent>{children}</ProfileContent>
        <MenuMobile activeMenu="دیجی‌کالای من" />
      </div>
    </div>
  );
}

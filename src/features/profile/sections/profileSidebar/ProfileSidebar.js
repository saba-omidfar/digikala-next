"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import useSidebarSticky from "@/features/profile/hooks/useSidebarSticky";
import LogoutModal from "@/components/layout/header/modals/logoutModal/LogoutModal";

import { useModal } from "@/contexts/modalContext";

import { useGetProfile } from "@/hooks/useUser";
import useScreenStatus from "@/hooks/useScreenStatus";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./profileSidebar.module.css";

const menuItems = [
  {
    title: "خلاصه فعالیت‌ها",
    href: "/profile",
    icon: "#home2Outline",
  },
  {
    title: "پلاس",
    href: "/profile/digiplus",
    icon: "#plus",
  },
  {
    title: "سفارش‌ها",
    href: "/profile/orders",
    icon: "#order",
  },
  {
    title: "لیست‌های من",
    href: "/profile/lists",
    icon: "#favoriteOff",
  },
  {
    title: "دیدگاه‌ها و پرسش‌ها",
    href: "/profile/comments",
    icon: "#comment",
  },
  {
    title: "آدرس‌ها",
    href: "/profile/addresses",
    icon: "#street",
  },
  {
    title: "بازدیدهای اخیر",
    href: "/profile/user-history/",
    icon: "#time",
  },
  {
    title: "اطلاعات حساب کاربری",
    href: "/profile/personal",
    icon: "#profileOff",
  },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  const { openModal } = useModal();
  const { isSmallScreen } = useScreenStatus();

  const { data: profile } = useGetProfile();

  const { outerRef, innerRef } = useSidebarSticky({
    top: 86,
    bottomBoundarySelector: "#products-container",
  });

  return (
    <div className={styles.profile_sidebar}>
      <div className={styles.profile_sidebar_container}>
        <div className={styles.profile_sidebar_user}>
          <div className={styles.profile_user}>
            <div className="d-flex flex-column">
              {profile?.is_verified ? (
                <p className={styles.user_name}>
                  {profile?.first_name} {profile?.last_name}
                </p>
              ) : (
                ""
              )}
              <p
                className={`${profile?.is_verified ? styles.user_verified_phone : styles.user_phone}`}
              >
                {toPersianDigits(profile?.phone_number)}
              </p>
            </div>
            <Link
              data-cro-id="profile-edit"
              href="/profile/personal"
              className={styles.edit_link}
            >
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.edit_icon}>
                  <use href="#edit"></use>
                </svg>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.profile_menu}>
          {menuItems
            .filter((item) => !(isSmallScreen && item.href === "/profile"))
            .map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/profile" &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <div
                  key={item.href}
                  data-cro-id="profile-sidebar-menu"
                  className={`${styles.menu_item} ${
                    isActive ? styles.menu_item_active : ""
                  }`}
                >
                  {isActive && (
                    <div className={styles.menu_item__selected_line} />
                  )}

                  <Link className={styles.menu_item_link} href={item.href}>
                    <div className="d-flex align-items-center">
                      <div
                        className={styles.menu_item_icon_container}
                        aria-hidden="false"
                      >
                        <svg
                          className={
                            item.icon === "#plus"
                              ? styles.menu_item_plus_icon
                              : styles.menu_item_icon
                          }
                        >
                          <use href={item.icon} />
                        </svg>
                      </div>

                      <div className="flex-grow-1">
                        <span
                          className={`${isActive ? styles.menu_item_active_text : styles.menu_item_text}`}
                        >
                          {item.title}
                        </span>
                      </div>
                      <div className={styles.menu_item_chevron_icon_container}>
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.menu_item_chevron_icon}>
                            <use href="#chevronLeft"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}

          <div
            data-cro-id="profile-sidebar-menu"
            className={styles.menu_item}
            onClick={() =>
              openModal(<LogoutModal />, {
                name: "logout",
                className: "modal__logout rounded-medium",
              })
            }
          >
            <span className={styles.menu_item_link}>
              <div className="d-flex align-items-center">
                <div
                  className={styles.menu_item_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.menu_item_icon}>
                    <use href="#registerationSignOut"></use>
                  </svg>
                </div>
                <div className="flex-grow-1">
                  <span className={styles.menu_item_text}>
                    خروج از حساب کاربری
                  </span>
                </div>

                <div className={styles.menu_item_chevron_icon_container}>
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.menu_item_chevron_icon}>
                      <use href="#chevronLeft"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

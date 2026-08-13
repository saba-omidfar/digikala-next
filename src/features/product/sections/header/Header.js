"use client";

import { useRouter } from "next-nprogress-bar";
import Link from "next/link";

import QuickActionsModal from "@/features/product/modals/quickActionsModal/QuickActionsModal";
import SearchModal from "@/components/layout/header/modals/searchModal/SearchModal";

import { useModal } from "@/contexts/modalContext";
import toPersianDigits from "@/utils/toPersianDigits";
import { useCartContext } from "@/contexts/CartContext";

import styles from "./header.module.css";

function Header() {
  const router = useRouter();
  const { openModal } = useModal();
  const { cart, basket } = useCartContext();

  const goHome = () => {
    router.push("/");
  };

  const handleSearchInputClick = () => {
    openModal(<SearchModal />, { name: "search" });
  };

  return (
    <div className={styles.header_content}>
      <div className="d-flex justify-content-center align-items-center gap-1">
        <div className={styles.header_close_btn} onClick={goHome}>
          <div
            data-icon-name="cube-value-close"
            data-icon="&#xE907;"
            className={`${styles.header_close_icon} cube-font-icon`}
          ></div>
        </div>
      </div>
      <div className={styles.header_empty_space}></div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <div
          className={styles.header_search_btn}
          onClick={handleSearchInputClick}
        >
          <div
            data-icon-name="cube-value-search"
            data-icon="&#xE91F;"
            className={`${styles.header_search_icon} cube-font-icon`}
          ></div>
        </div>
        <div className={styles.header_cart_icon_container}>
          <Link href="/checkout/cart/">
            <div className="d-flex position-relative">
              <div
                data-icon-name="cube-value-cart"
                data-icon="&#xE937;"
                className={`${styles.header_cart_icon} cube-font-icon`}
              ></div>
              {basket?.length ? (
                <span className={styles.header_cart_count}>
                  {toPersianDigits(cart?.items_count)}
                </span>
              ) : (
                ""
              )}
            </div>
          </Link>
        </div>
        <div>
          <div
            className={styles.header_mort_vert_btn}
            onClick={() =>
              openModal(<QuickActionsModal />, {
                name: "quick-actions",
                className: "modal__quick_actions",
              })
            }
          >
            <div className="d-flex">
              <div
                data-icon-name="cube-value-more"
                data-icon="&#xE906;"
                className={`${styles.header_mort_vert_icon} cube-font-icon`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

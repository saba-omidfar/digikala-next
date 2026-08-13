import Link from "next/link";

import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";
import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./mobileFooter.module.css";

function MobileFooter({ activeMenu }) {
  const { openMobileModal } = useModal();

  const { innerWidth } = useScreenStatus();
  const { user } = useUserContext();
  const { cart, basket } = useCartContext();

  return (
    <div
      className={`${styles.mobile_footer} ${activeMenu === "basket" ? styles.mobile_height_footer : ""}`}
      id="base_layout_mobile_footer"
      style={{
        width: innerWidth,
      }}
    >
      <div>
        <div className={styles.box_container}>
          <div className="d-flex flex-row justify-content-between align-items-start">
            <div className="w-100">
              <div className={styles.btns_container}>
                <div className={styles.fixed_button_box}>
                  <Link
                    href="/checkout/shipping/"
                    className={styles.fixed_button}
                    id="cart-continue-shopping"
                  >
                    <span className={styles.fixed_button_text}>ثبت سفارش</span>
                  </Link>
                </div>
                <div className={styles.fixed_title_box}>
                  <div className={styles.top_section}>
                    <div
                      className="d-flex gap-2"
                      onClick={() => openMobileModal("cart-bill-box")}
                    >
                      <span className={styles.top_section_text}>
                        {user ? (
                          <>
                            {basket?.length !== 0 ? (
                              <span className={styles.subtitle}>
                                {basket.length > 1 && "جمع"}{" "}
                                {toPersianDigits(basket?.length)} کالا
                              </span>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </span>
                      <div className="d-flex" aria-hidden="false">
                        <div
                          className={`${styles.chevron_icon} cube-font-icon`}
                          data-icon-name="cube-nav-chevron-down"
                          data-icon=""
                        ></div>
                      </div>
                    </div>
                    <div className={styles.old_price}>
                      <div className={styles.old_price_inner}>
                        <span className={styles.old_price_text}>
                          {(cart?.rrp_price_total / 10).toLocaleString("fa-IR")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.bottom_section}>
                    <div className={styles.payable_price}>
                      <div className={styles.payable_price_inner}>
                        <span className={styles.payable_price_text}>
                          {(cart?.payable_price / 10)?.toLocaleString("fa-IR")}
                        </span>
                      </div>
                      <span aria-hidden="true">
                        <svg className={styles.price_icon}>
                          <use href="#toman"></use>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <MenuMobile noShadowStyle activeMenu="سبد خرید" />
      </div>
    </div>
  );
}

export default MobileFooter;

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import CartPopover from "@/components/modules/cartPopover/CartPopover";

import toPersianDigits from "@/utils/toPersianDigits";
import scrollToSection from "@/utils/scrollToSection";

import useScreenStatus from "@/hooks/useScreenStatus";

import { useModal } from "@/contexts/modalContext";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./cartSectionTitle.module.css";

function CartSectionTitle() {
  const anchorRef = useRef(null);

  const [anchorOpen, setAnchorOpen] = useState(false);

  const { user } = useUserContext();
  const { isSmallScreen } = useScreenStatus();
  const { openMobileModal, closeModal } = useModal();
  const { userCart, basket, nextPurchaseBasket } = useCartContext();

  const handleNextCartClick = () => {
    if (isSmallScreen) {
      openMobileModal("cart-action-modal", { type: "basket" });
    } else {
      setAnchorOpen(true);
    }
  };

  const handleNextCartIconClick = () => {
    isSmallScreen
      ? openMobileModal("next-cart-mobile")
      : scrollToSection("NEXTCART", 100);
  };

  useEffect(() => {
    const handleResize = () => {
      setAnchorOpen(false);
      closeModal();
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.basket_title}>
      <div className="d-flex align-items-start w-100">
        <div className="d-flex align-items-center flex-grow-1">
          <div className="d-flex align-items-start flex-grow-1">
            <div className="flex-grow-1">
              <div className={styles.title_container}>
                <div className="d-flex align-items-center flex-grow-1">
                  <div className={styles.title}>
                    <span className="position-relative">
                      <div>
                        <div className={styles.subtitle_container}>
                          <span className={styles.subtitle_bold}>سبد خرید</span>
                          {user ? (
                            <>
                              {basket.length !== 0 ? (
                                <span className={styles.subtitle}>
                                  {toPersianDigits(basket.length)} کالا
                                </span>
                              ) : (
                                ""
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </span>
                  </div>
                  {user ? (
                    <div className={styles.left_section}>
                      <div
                        className="position-relative"
                        onClick={handleNextCartIconClick}
                      >
                        {userCart && nextPurchaseBasket?.length ? (
                          <div className={styles.next_cart_number}>
                            <span className={styles.next_cart_number_value}>
                              {toPersianDigits(nextPurchaseBasket?.length)}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className={styles.next_cart_images_row}>
                          <div className="position-relative d-inline-flex z-3">
                            <div
                              className={styles.list_icon_container}
                              aria-hidden="false"
                            >
                              <div
                                className={`${styles.list_icon} cube-font-icon`}
                                data-icon-name="cube-action-favorite-list"
                                data-icon=""
                              ></div>
                            </div>
                          </div>

                          {nextPurchaseBasket?.length ? (
                            <div
                              className={styles.next_cart_images_contianer}
                              aria-hidden="true"
                            >
                              {nextPurchaseBasket.map((item, index) => (
                                <div
                                  key={index}
                                  className={`${styles.next_cart_image_chip} ${styles.animate_chip}`}
                                  style={{
                                    "--offset": `${index * 24}px`,
                                    "--next-cart-image-delay": `${index * 150}ms`,
                                    zIndex: nextPurchaseBasket.length - index,
                                  }}
                                >
                                  <div
                                    className={styles.next_cart_img_container}
                                    aria-hidden="true"
                                  >
                                    <picture>
                                      <source
                                        type="image/webp"
                                        srcSet={
                                          item.product.images.main.webp_url?.[0]
                                        }
                                      />
                                      <source
                                        type="image/jpeg"
                                        srcSet={
                                          item.product.images.main.url?.[0]
                                        }
                                      />
                                      <img
                                        className={styles.next_cart_img}
                                        src={item.product.images.main.url?.[0]}
                                        alt={item.product.title_fa || ""}
                                      />
                                    </picture>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {basket.length ? (
                        <div>
                          <button
                            type="button"
                            onClick={handleNextCartClick}
                            ref={anchorRef}
                            data-cro-id="cart-more-infos"
                          >
                            <div className="d-flex" aria-hidden="false">
                              <div
                                className={`${styles.more_icon} cube-font-icon`}
                                data-icon-name="cube-nav-more-vert"
                                data-icon=""
                              ></div>
                            </div>
                          </button>

                          <CartPopover
                            open={anchorOpen}
                            onClose={() => setAnchorOpen(false)}
                            anchorRef={anchorRef}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <Link
                      className={styles.checkout_link}
                      href="/users/login/?backUrl=/checkout/cart/"
                    >
                      <span className={styles.checkout_link_text}>
                        ورود به حساب کاربری
                      </span>
                      <div className="d-flex" aria-hidden="false">
                        <div
                          className={`${styles.chevron_icon} cube-font-icon`}
                          data-icon-name="cube-nav-chevron-left"
                          data-icon=""
                        ></div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSectionTitle;

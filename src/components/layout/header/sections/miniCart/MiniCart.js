import Link from "next/link";
import Image from "next/image";

import Spinner from "@/utils/Spinner";
import MiniCartItem from "@/components/layout/header/sections/miniCart/miniCartItem/MiniCartItem";

import { useCartContext } from "@/contexts/CartContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./miniCart.module.css";

function MiniCart({ setIsOpenMiniCart }) {
  const { isLoadingUserCart, cart, basket } = useCartContext();

  return (
    <div
      className={styles.mini_cart_container}
      onMouseLeave={() => setIsOpenMiniCart(false)}
    >
      {isLoadingUserCart ? (
        <Spinner color="000" size={16} />
      ) : (
        <>
          <div className="d-flex min-h-0 h-100 flex-1 flex-column overflow-hidden">
            <div className={styles.mini_cart_header_container}>
              <span className={styles.mini_cart_title}>خلاصه سبد خرید شما</span>
              {basket.length ? (
                <span className={styles.mini_cart_count}>
                  {toPersianDigits(cart?.items_count)} کالا
                </span>
              ) : (
                ""
              )}
            </div>

            <div className={styles.mini_cart_content_container}>
              <div className={styles.mini_cart_content}>
                {basket?.length ? (
                  basket?.map((cartItem, index) => (
                    <MiniCartItem
                      key={index}
                      isLastItem={index === basket?.length - 1}
                      cartItem={cartItem}
                    />
                  ))
                ) : (
                  <div className={styles.empty_basket_container}>
                    <div className="d-flex justify-content-center">
                      <div className={styles.empty_basket_logo}>
                        <Image
                          className="w-100 d-inline-block"
                          src="/images/svg/empty-cart.svg"
                          width={200}
                          height={150}
                          alt="empty-cart"
                          title=""
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </div>
                    <p className={styles.empty_basket_title}>
                      سبد خرید شما خالی است!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.mini_cart_footer}>
            <div className={styles.footer_btn}>
              <Link
                className={styles.footer_btn_link}
                data-cro-id="cart-continue-shopping"
                href="/checkout/shipping/"
              >
                <span className={styles.footer_btn_text}>ثبت سفارش</span>
              </Link>
            </div>
            <div className="d-flex flex-column gap-2">
              <div className={styles.product_price_container}>
                <div className={styles.product_old_price}>
                  <span className={styles.product_old_price_text}>
                    {(cart?.rrp_price_total / 10)?.toLocaleString("fa-IR")}
                  </span>
                </div>
              </div>
              <div className="d-flex gap-2">
                <div className={styles.product_price}>
                  <span className={styles.product_price_text}>
                    {(cart?.payable_price / 10)?.toLocaleString("fa-IR")}
                  </span>
                  <div>
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
        </>
      )}
    </div>
  );
}

export default MiniCart;

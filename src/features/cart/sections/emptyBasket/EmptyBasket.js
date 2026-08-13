import { useUserContext } from "@/contexts/UserContext";

import scrollToSection from "@/utils/scrollToSection";

import styles from "./emptyBasket.module.css";

function EmptyBasket() {
  const { userLists } = useUserContext();

  return (
    <div className={styles.empty_cart_container}>
      <div className={styles.empty_cart}>
        <div
          aria-hidden="false"
          aria-label="empty-cart"
          className={styles.empty_cart_img_container}
        >
          <img
            className={styles.empty_cart_img}
            src="/images/svg/cart/hand-basket.svg"
            alt="empty-cart"
            title=""
          />
        </div>
        <div className={styles.empty_cart_title_container}>
          <span className={styles.empty_cart_title}>
            سبد دیجی‌کالایی شما خالی است!
          </span>
          {userLists?.length ? (
            <span className={styles.empty_cart_subtitle}>
              <p className="d-block text-center">
                اگر به صفحه‌های زیر سر بزنید، دست‌‌پُر برمی‌گردید.
              </p>
            </span>
          ) : (
            ""
          )}
        </div>
        {userLists?.length ? (
          <div
            className={styles.list_btn}
            onClick={() => scrollToSection("NEXTCART", 100)}
          >
            <div className="d-flex" aria-hidden="false">
              <div
                className={`${styles.list_icon} cube-font-icon`}
                data-icon-name="cube-action-favorite-list"
                data-icon=""
              ></div>
            </div>
            <span className={styles.list_title}>لیست های شما</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default EmptyBasket;

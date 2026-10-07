import {
  useObservedProducts,
  useGetPublicList,
  useFavoriesProducts,
} from "@/features/profile/hooks/useLists";

import scrollToSection from "@/utils/scrollToSection";

import styles from "./emptyBasket.module.css";
import { useUserContext } from "@/contexts/UserContext";

export default function EmptyBasket() {
  const { user } = useUserContext();

  const { data } = useGetPublicList();
  const { data: observed_list } = useObservedProducts();
  const { data: favorite_list } = useFavoriesProducts();

  const hasList = Boolean(
    data?.public_list || observed_list?.products || favorite_list?.products,
  );

  return (
    <div className={styles.empty_cart_container}>
      <div className={styles.empty_cart}>
        <div
          role="img"
          aria-hidden="false"
          aria-label="empty-cart"
          className={styles.empty_cart_img_container}
        >
          <img
            className={styles.empty_cart_img}
            src="https://www.digikala.com/statics/img/svg/cart/hand-basket.svg"
            alt="empty-cart"
            title=""
          />
        </div>

        <div className={styles.empty_cart_title_container}>
          <dds-text variant="title-1">سبد دیجی‌کالایی شما خالی است!</dds-text>
          {user?.is_logged_in ? (
            <dds-text variant="body-2" color="content/3">
              <p className="d-block text-center">
                اگر به صفحه‌های زیر سر بزنید، دست‌‌پُر برمی‌گردید.
              </p>
            </dds-text>
          ) : (
            ""
          )}
        </div>

        {user?.is_logged_in && hasList ? (
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

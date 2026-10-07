"use client";

import { useRecentViewedProducts } from "@/features/profile/hooks/useLists";

import UserHistoryProduct from "./userHistoryProduct/UserHistoryProduct";
import LoadingProduct from "../loadingProduct/LoadingProduct";

import styles from "./profileUserHistory.module.css";

export default function ProfileUserHistory() {
  const { data, refetch, isLoading } = useRecentViewedProducts();

  return (
    <div>
      <div className={styles.profile_content}>
        <div className={styles.profile_header_container}>
          <div className={styles.profile_header}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.profile_title}>
                <span className="position-relative">{data?.title}</span>
              </p>
            </div>
            <div className={styles.profile_title__line_red}></div>
          </div>
        </div>
        {isLoading ? (
          <div className="d-flex flex-wrap">
            {[...Array(6)].map((_, index) => (
              <LoadingProduct key={index} />
            ))}
          </div>
        ) : (
          <div className={styles.user_history_content}>
            {data?.products?.length ? (
              <div id="plpLayoutContainer" className={styles.user_history_list}>
                <section className="w-100 flex-grow-1 position-relative">
                  <div className="d-flex h-100 flex-column">
                    <div>
                      <div className="d-flex flex-wrap">
                        {data?.products?.map((product) => (
                          <UserHistoryProduct
                            key={product.id}
                            product={product}
                            refetch={refetch}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div className={styles.user_history_empty}>
                <div
                  role="img"
                  aria-hidden="false"
                  aria-label="لیست بازدید‌های اخیر شما خالی است."
                  className={styles.user_history_empty_img_container}
                >
                  <img
                    className={styles.user_history_empty_img}
                    alt="لیست بازدید‌های اخیر شما خالی است."
                    title=""
                    src="https://www.digikala.com/statics/img/svg/empty-cart.svg"
                  />
                </div>
                <div className={styles.user_history_empty_title}>
                  لیست بازدید‌های اخیر شما خالی است.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

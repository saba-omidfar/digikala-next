import ObservedProduct from "@/features/profile/sections/observedProduct/ObservedProduct";
import ListLoading from "@/features/profile/sections/listLoading/ListLoading";

import { useObservedProducts } from "@/features/profile/hooks/useLists";

import styles from "./observedList.module.css";

export default function ObservedList() {
  const { data, isLoading, refetch } = useObservedProducts();

  return (
    <li>
      {isLoading ? (
        <div className={styles.loading_container}>
          <ListLoading />
        </div>
      ) : (
        <div className={styles.observed_list_content}>
          <div id="plpLayoutContainer" className={styles.observed_list}>
            {!data?.products?.length ? (
              <section className="w-100 flex-grow-1 position-relative">
                <div className={styles.list_empty_container}>
                  <div className={styles.list_empty}>
                    <div
                      role="img"
                      aria-hidden="false"
                      aria-label="لیست اطلاع‌رسانی‌های شما خالی است."
                      className={styles.list_empty_img_container}
                    >
                      <img
                        className={styles.list_empty_img}
                        alt="لیست اطلاع‌رسانی‌های شما خالی است."
                        title=""
                        src="https://www.digikala.com/statics/img/svg/announcements-list-empty.svg"
                      />
                    </div>
                  </div>
                  <div className={styles.list_empty_title}>
                    لیست اطلاع‌رسانی‌های شما خالی است.
                  </div>
                </div>
              </section>
            ) : (
              <div className="w-100 d-flex h-100 flex-column">
                <div className="w-100">
                  <div className="d-flex flex-wrap">
                    {data?.products?.map((product, index) => (
                      <ObservedProduct
                        key={product.id}
                        index={index}
                        product={product}
                        refetch={refetch}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

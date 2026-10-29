import { usePendingComments } from "@/features/profile/hooks/usePendingComments";
import LoadingProduct from "../../loadingProduct/LoadingProduct";

import styles from "./pendingList.module.css";

export default function PendingList() {
  const { data, isLoading } = usePendingComments();
  return (
    <li>
      {isLoading ? (
        <LoadingProduct />
      ) : (
        <div>
          {!data?.reviews?.length ? (
            <div className={styles.list_empty_container}>
              <div
                className={styles.list_empty_img_container}
                role="img"
                aria-hidden="false"
                aria-label="بدون نظر"
              >
                <img
                  className={styles.list_empty_img}
                  alt="بدون نظر"
                  title=""
                  src="https://www.digikala.com/statics/img/svg/profile/order-empty.svg"
                />
              </div>
              <p className={styles.list_empty_title}>هنوز هیچ نظری ندارید</p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </li>
  );
}

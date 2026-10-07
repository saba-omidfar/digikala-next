import { usePendingComments } from "@/features/profile/hooks/usePendingComments";
import ListLoading from "@/features/profile/sections/listLoading/ListLoading";

import styles from "./pendingList.module.css";

export default function PendingList() {
  const { data, refetch, isLoading, sort, setSort } = usePendingComments();
  return (
    <li>
      {isLoading ? (
        <div className={styles.loading_container}>
          <ListLoading />
        </div>
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

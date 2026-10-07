import ListLoading from "@/features/profile/sections/listLoading/ListLoading";
import CommentItem from "./commentItem/CommentItem";

import { useComments } from "@/features/profile/hooks/useComments";

import styles from "./commentsList.module.css";

export default function CommentsList() {
  const { data, refetch, isLoading, sort, setSort } = useComments();

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
              <p>هنوز هیچ نظری ندارید</p>
            </div>
          ) : (
            data?.reviews?.map((review) => (
              <CommentItem
                key={review?.id}
                comment={review}
                refetch={refetch}
              />
            ))
          )}
        </div>
      )}
    </li>
  );
}

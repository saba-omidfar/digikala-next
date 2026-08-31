import Link from "next/link";

import { useModal } from "@/contexts/modalContext";
import { useSearchContext } from "@/contexts/searchContext";

import styles from "./searchResultBox.module.css";

function SearchResultBox({ data }) {
  const { closeModal } = useModal();
  const { searchItemValue } = useSearchContext();

  return (
    <Link
      className={styles.search_result_item}
      href={
        data?.url
          ? `${data.url.url}${
              data?.type === "category"
                ? `${data.url.url.includes("?") ? "&" : "?"}categoryId=${data.id}`
                : ""
            }`
          : "#"
      }
      onClick={() => closeModal()}
    >
      <div className={styles.icon_section}>
        <div className="d-flex" aria-hidden="false">
          {data?.type === "category" ? (
            searchItemValue === data?.title ? (
              <div
                className={`${styles.icon} cube-font-icon`}
                data-icon-name="cube-action-recent"
                data-icon=""
              ></div>
            ) : (
              <div
                className={`${styles.icon} cube-font-icon`}
                data-icon-name="cube-cat-all"
                data-icon=""
              ></div>
            )
          ) : (
            ""
          )}

          {data?.type === "query" ? (
            <svg className={styles.svg_icon}>
              <use href="#searchSearch"></use>
            </svg>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.content_section}>
        <div className={styles.content_title_wrapper}>
          <span className={styles.title}>
            <span className={styles.title_highlight}>{data?.title}</span>{" "}
          </span>
        </div>
        {data?.type === "category" ? (
          <div className={styles.left_section}>
            <span className={styles.subtitle}>
              {data?.category_title
                ? `در ${data?.category_title}`
                : "دسته‌بندی"}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
export default SearchResultBox;

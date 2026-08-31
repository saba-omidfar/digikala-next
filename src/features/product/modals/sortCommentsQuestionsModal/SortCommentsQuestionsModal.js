import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./sortCommentsQuestionsModal.module.css";

function SortCommentsQuestionsModal() {
  const { closeModal } = useModal();
  const { commentsData, activeCommentsSort, setActiveCommentsSort } =
    useProductContext();

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <span className={styles.header_title}> مرتب سازی بر اساس</span>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal()}
          >
            <div
              className={`${styles.close_icon} cube-font-icon`}
              data-icon-name="cube-nav-close"
              data-icon=""
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div>
          {commentsData.sort_options?.map((sortOption) => (
            <div
              key={sortOption.id}
              className="w-100"
              data-cro-id="pdp-comment-sort"
              onClick={() => setActiveCommentsSort(sortOption?.id)}
            >
              <div className="w-100 d-flex align-items-center justify-content-start">
                <div className="flex-grow-1">
                  <div className={styles.sort_item_container}>
                    <div className={styles.sort_title}>{sortOption?.title}</div>
                    {activeCommentsSort === sortOption?.id && (
                      <div className="d-flex">
                        <div
                          className={`${styles.check_icon} cube-font-icon`}
                          data-icon-name="cube-content-check"
                          data-icon="&#xE90F;"
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SortCommentsQuestionsModal;

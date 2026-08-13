import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import { useListing } from "@/contexts/ListingContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./sortDeatils.module.css";

function SortModal() {
  const { closeMobileModal } = useModal();
  const { data, params, sortDefault, sortDefaultChangeHandler } = useListing();

  function onDismiss() {
    closeMobileModal();
  }

  return (
    <>
      <BottomSheet
        open
        onDismiss={onDismiss}
        blocking
        snapPoints={({ maxHeight }) => [0.8 * maxHeight, maxHeight]}
        header={
          <div className={styles.header_container}>
            <span className={styles.header_title}>مرتب‌سازی بر اساس</span>
            <div className="d-flex" onClick={onDismiss} aria-hidden="false">
              <svg className={styles.close_icon}>
                <use href="#close"></use>
              </svg>
            </div>
          </div>
        }
      >
        <div className={styles.content}>
          {data?.sort_options?.map((sortOption) => (
            <div
              key={sortOption.id}
              className="w-100"
              data-cro-id="plp-sort"
              onClick={() => {
                sortDefaultChangeHandler(sortOption);
                onDismiss();
              }}
            >
              <div className="w-100 d-flex align-items-center justify-content-start">
                <div className="flex-grow-1">
                  <div className={styles.sort_title_container}>
                    <div className={styles.sort_title}>
                      {sortOption.title_fa}
                    </div>
                    {params?.sort == sortOption.id ||
                    sortDefault?.id === sortOption.id ? (
                      <div className="d-flex" aria-hidden="false">
                        <svg className={styles.sort_icon}>
                          <use href="#done"></use>
                        </svg>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </BottomSheet>
    </>
  );
}

export default SortModal;

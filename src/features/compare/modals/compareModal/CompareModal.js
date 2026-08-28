import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useModal } from "@/contexts/modalContext";
import { useSearchCompare } from "@/hooks/useCompare";
import useScreenStatus from "@/hooks/useScreenStatus";

import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";
import Loading from "@/components/modules/loading/Loading";

import styles from "./compareModal.module.css";

function CompareModal({ productIds }) {
  const router = useRouter();
  const loadMoreRef = useRef(null);

  const { closeModal } = useModal();
  const { isSmallScreen } = useScreenStatus();
  const {
    data,
    isLoading,
    loadMore,
    isFetchingMore,
    isAutoFetchEnabled,
    searchValue,
    setSearchValue,
  } = useSearchCompare(productIds);

  const selectProductToCompare = (productId) => {
    const newUrl = `/compare/${[...productIds, `dkp-${productId}`].join("/")}`;

    closeModal();

    router.push(newUrl);
  };

  useEffect(() => {
    const current = loadMoreRef.current;

    if (!current || !isAutoFetchEnabled || isLoading || isFetchingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, [loadMore, isAutoFetchEnabled, isLoading, isFetchingMore, data]);

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.title}>
                <span className="position-relative">
                  انتخاب کالا برای مقایسه
                </span>
              </p>
            </div>
          </div>
          <div className="flex-grow-1"></div>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal()}
          >
            <svg
              data-test-id="close-modal-icon-button"
              className={styles.close_icon}
            >
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      </div>
      <div id="" className="d-flex flex-column overflow-y-auto flex-grow-1">
        <div className={styles.content_container}>
          <div>
            <div className={styles.content}>
              <div className={styles.search_container}>
                <label className="d-inline-block w-100">
                  <div className={styles.search_input_container}>
                    <div
                      className={styles.search_icon_container}
                      aria-hidden="false"
                    >
                      <svg className={styles.search_icon}>
                        <use href="#searchSearch"></use>
                      </svg>
                    </div>
                    <div className="flex-grow-1">
                      <input
                        className={styles.input}
                        type="text"
                        placeholder="جستجو در کالاها..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </div>
                  </div>
                </label>
              </div>
              <div className={styles.best_products_container}>
                <div className={styles.products_title_container}>
                  <span className={styles.products_title}>
                    برترین کالاها برای مقایسه
                  </span>
                  <span className={styles.products_count}>
                    {data?.pager?.total_items.toLocaleString("fa-IR")} کالا
                  </span>
                </div>
                <div className={styles.products_container}>
                  <div
                    id="plpLayoutContainer"
                    className={styles.products_layout}
                  >
                    <section className="w-100 flex-grow-1 position-relative">
                      <div className="d-flex flex-column h-100">
                        <div id="22">
                          <div className="d-flex flex-wrap">
                            {isLoading
                              ? Array.from({ length: 5 }).map((_, i) => (
                                  <VerticalProductCard
                                    key={i}
                                    index={i}
                                    isSkeleton
                                    isVertical
                                    width="150px"
                                  />
                                ))
                              : data?.products?.map((product, index) => (
                                  <div
                                    key={product?.id}
                                    className={`${styles.product_card} ${styles.border_complete_b} ${index % 2 === 0 && !isSmallScreen ? styles.border_complete_l : ""}`}
                                    onClick={() =>
                                      selectProductToCompare(product?.id)
                                    }
                                  >
                                    <div style={{ pointerEvents: "none" }}>
                                      <VerticalProductCard
                                        index={index}
                                        product={product}
                                        imgContainerClassName={
                                          styles.product_img_container
                                        }
                                        linkClassName={styles.product_link}
                                        isVertical
                                        hasBorderLeft={
                                          !isSmallScreen &&
                                          index !== data?.products?.length - 1
                                        }
                                        width="150px"
                                      />
                                    </div>
                                  </div>
                                ))}
                          </div>
                        </div>
                        {!isSmallScreen && isFetchingMore && (
                          <div className={styles.loading_container}>
                            <Loading isSmall />
                          </div>
                        )}

                        <div ref={loadMoreRef} />
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CompareModal;

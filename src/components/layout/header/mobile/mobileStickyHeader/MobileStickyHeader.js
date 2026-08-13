"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import SearchModal from "@/components/layout/header/modals/searchModal/SearchModal";

import { useModal } from "@/contexts/modalContext";

import styles from "./mobileStickyHeader.module.css";

function MobileStickyHeader({
  isBestSellingPage,
  isIncredibleTeasing,
  isBrandPage,
  hasNotSearchIcon,
  title,
  brand,
}) {
  const router = useRouter();
  const { sellerCode } = useParams();

  const { openModal, closeModal } = useModal();

  const copyPageUrlHandler = () => {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl).then(() => {
      showSnackbar("لینک صفحه با موفقیت کپی شد.");
    });
  };

  return (
    <div className={styles.mobile_sticky_header_container}>
      <div className={styles.mobile_sticky_header}>
        {isBestSellingPage ? (
          <div className={styles.best_selling_mobile_header__bg_container}>
            <img
              className={styles.best_selling_mobile_header__bg}
              src="/images/svg/typography/bestSellingPattern.svg"
              alt=""
              title=""
            />
          </div>
        ) : (
          ""
        )}
        <div className="d-flex align-items-center">
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => {
              closeModal();
              router.push("/");
            }}
          >
            <svg className={styles.arrow_icon}>
              <use href="#arrowRight"></use>
            </svg>
          </div>
          {title && (
            <h1 className={styles.mobile_sticky_header_title}>
              {title} {brand ? brand : ""}
            </h1>
          )}
        </div>
        {isBestSellingPage ? (
          <span className={styles.best_selling_title}>پرفروش‌ترین‌ها</span>
        ) : (
          ""
        )}
        <div className="d-flex align-items-center">
          {!hasNotSearchIcon &&
          !sellerCode &&
          !isBrandPage &&
          !isIncredibleTeasing ? (
            <div
              className={styles.search_icon_container}
              onClick={() => openModal(<SearchModal />, { name: "search" })}
            >
              <div className="d-flex justify-content-between align-items-center"></div>
              <span>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.search_icon}>
                    <use href="#searchSearch"></use>
                  </svg>
                </div>
              </span>
            </div>
          ) : (
            ""
          )}
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={copyPageUrlHandler}
          >
            <svg className={styles.share_icon}>
              <use href="#share"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileStickyHeader;

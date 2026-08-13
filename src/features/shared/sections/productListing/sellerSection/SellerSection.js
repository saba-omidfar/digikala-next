import SellerModal from "@/features/product/modals/sellerModal/SellerModal";

import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";
import { getScoreClass, getScoreLabel } from "@/utils/getScoreClass";

import styles from "./sellerSection.module.css";

export default function SellerSection({ seller }) {
  const { openModal } = useModal();

  return (
    <div className={styles.seller_container}>
      <div className={styles.seller_content}>
        <div className={styles.seller_content_header}>
          <div className="d-flex align-items-center">
            <div className={styles.seller_icon_container}>
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.seller_icon}>
                  <use href="#seller"></use>
                </svg>
              </div>
              <span className={styles.verified_icon_badge}>
                <div
                  className={styles.verified_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.verified_icon}>
                    <use href="#verifiedUser"></use>
                  </svg>
                </div>
              </span>
            </div>
            <div className={styles.seller_title_container}>
              <div className="w-100 d-flex justify-content-between">
                <h1 className={styles.seller_title}>{seller?.title}</h1>
              </div>
              <p className={styles.seller_registration_date}>
                عضو از {toPersianDigits(seller?.registration_date)}
              </p>
            </div>
          </div>
          <div
            className={styles.info_icon_container}
            aria-hidden="false"
            onClick={() =>
              openModal(<SellerModal seller={seller} />, {
                name: "seller",
                className: "rounded-medium",
              })
            }
          >
            <svg className={styles.info_icon}>
              <use href="#infoOutline"></use>
            </svg>
          </div>
        </div>
        <div className={styles.seller_info_container}>
          <div className={styles.seller_info_content}>
            <div className={styles.seller_info_box}>
              <div>
                <p
                  className={`${styles.seller_info_box_title} ${getScoreClass(seller?.rating?.total_rate / 10)}`}
                >
                  {seller?.rating?.total_rate
                    ?.toLocaleString("fa-IR")
                    .replace("٫", ".")}
                  ٪
                </p>
              </div>
              <p className={styles.seller_info_box_subtitle}>رضایت از کالاها</p>
            </div>
            <div className={styles.seller_info_box}>
              <div>
                <p
                  className={`${styles.seller_info_box_title} ${getScoreLabel(
                    seller?.grade?.label,
                  )}`}
                >
                  {seller?.grade?.label}
                </p>
              </div>
              <p className={styles.seller_info_box_subtitle}>عملکرد فروشنده</p>
            </div>
            <div
              className={styles.more_details_box}
              onClick={() =>
                openModal(<SellerModal seller={seller} />, {
                  name: "seller",
                  className: "rounded-medium",
                })
              }
            >
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.info_icon}>
                  <use href="#infoOutline"></use>
                </svg>
              </div>
              <div></div>
              <p className={styles.more_details_text}>جزئیات بیشتر</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

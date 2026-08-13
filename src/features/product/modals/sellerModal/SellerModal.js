import { useModal } from "@/contexts/modalContext";

import { getScoreClass, getScoreLabel } from "@/utils/getScoreClass";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./sellerModal.module.css";

export default function SellerModal({ seller }) {
  const { closeModal } = useModal();

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.header_title_text}>
                <span className="position-relative">
                  اطلاعات تکمیلی فروشنده
                </span>
              </p>
            </div>
          </div>
          <div className="flex-grow-1 text-h5"></div>
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

      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content}>
          <div className={styles.seller_more_info_container}>
            <div className={styles.seller_name}>فروشگاه {seller?.title}</div>
            {seller?.rating && (
              <>
                <p className={styles.seller_registration_date}>
                  عضو از {toPersianDigits(seller?.registration_date)}
                </p>
                <div className={styles.seller_rating}>
                  <p
                    className={`${styles.seller_total_rate} ${getScoreClass(seller?.rating?.total_rate / 10)}`}
                  >
                    {seller?.rating?.total_rate
                      ?.toLocaleString("fa-IR")
                      .replace("٫", ".")}
                    %
                  </p>
                  <p className={styles.seller_total_rate_text}>
                    رضایت خریداران از کیفیت کالاها
                  </p>
                  <p className={styles.seller_total_count}>
                    {toPersianDigits(seller?.rating?.total_count)} نفر امتیاز
                    داده‌اند
                  </p>
                </div>
                <div className={styles.seller_successBar}>
                  <div
                    className={styles.seller_info_details__successBar}
                    style={{
                      width: `${seller?.rating?.totally_satisfied?.rate}%`,
                      backgroundColor: "#00a049",
                    }}
                  ></div>
                  <div
                    className={styles.seller_info_details__successBar}
                    style={{
                      width: `${seller?.rating?.satisfied?.rate}%`,
                      backgroundColor: "#65aa57",
                    }}
                  ></div>
                  <div
                    className={styles.seller_info_details__successBar}
                    style={{
                      width: `${seller?.rating?.neutral?.rate}%`,
                      backgroundColor: "#b1b64d",
                    }}
                  ></div>
                  <div
                    className={styles.seller_info_details__successBar}
                    style={{
                      width: `${seller?.rating?.dissatisfied?.rate}%`,
                      backgroundColor: "#f9bc00",
                    }}
                  ></div>
                  <div
                    className={styles.seller_info_details__successBar_hint}
                    style={{
                      width: `${seller?.rating?.totally_dissatisfied?.rate}%`,
                      backgroundColor: "#f9a825",
                    }}
                  ></div>
                </div>
                <div className={styles.seller_successBar_caption}>
                  <span>کاملا راضی</span>
                  <span>کاملا ناراضی</span>
                </div>
              </>
            )}
            <div className={styles.seller_label_container}>
              <p
                className={`${styles.seller_label} ${getScoreLabel(
                  seller?.grade?.label,
                )}`}
              >
                {seller?.grade?.label}
              </p>
              <p className={styles.seller_label_caption}>عملکرد کلی فروشنده</p>
            </div>
            <div className="d-flex align-content-center mt-2 justify-content-between">
              <div className="text-center">
                <p className={styles.seller_footer_text}>
                  {toPersianDigits(seller?.statistics?.ship_on_time)?.replace(
                    "٫",
                    ".",
                  )}
                  %
                </p>
                <p className={styles.seller_footer_caption}>تامین به موقع</p>
              </div>
              <div className="text-center">
                <p className={styles.seller_footer_text}>
                  {toPersianDigits(seller?.statistics?.cancellation)?.replace(
                    "٫",
                    ".",
                  )}
                  %
                </p>
                <p className={styles.seller_footer_caption}>تعهد ارسال</p>
              </div>
              <div className="text-center">
                <p className={styles.seller_footer_text}>
                  {toPersianDigits(seller?.statistics?.return)?.replace(
                    "٫",
                    ".",
                  )}
                  %
                </p>
                <p className={styles.seller_footer_caption}>بدون مرجوعی</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Timer from "@/components/modules/timer/Timer";

import hexToRgb from "@/utils/hexToRgb";

import styles from "./pricingPromotion.module.css";

function PricingPromotion({
  variant,
  isIncredible,
  isPromotion,
  showTimer,
  onFinishTimer,
}) {
  if (!variant?.price?.badge) return null;

  let bg,
    source = "";

  switch (variant?.price?.badge?.title) {
    case "شگفت‌انگیز سفارشی":
      bg = `250, 0, 142`;
      source =
        "https://www.digikala.com/statics/img/svg/productCard/topBadge/PromotedIncredibleOffer.svg";
      break;

    case "پیشنهاد شگفت انگیز":
      bg = `${hexToRgb(variant?.price?.badge?.color)}`;
      source =
        "https://www.digikala.com/statics/img/svg/productCard/topBadge/IncredibleOffer.svg";
      break;

    case "پیشنهاد ویژه":
      source = "/images/svg/productcard/topBadge/IncredibleOffer.svg";
      break;

    case "فروش ویژه":
      bg = `${hexToRgb(variant?.price?.badge?.color)}`;

    default:
      break;
  }

  return (
    <div
      className={styles.promotion_container}
      style={{
        backgroundColor: `rgba(${bg}, 0.08)`,
      }}
    >
      <div className="d-flex align-items-center justify-content-center">
        {isIncredible ? (
          <div
            className={styles.logo_img_container}
            aria-hidden="true"
            aria-label=""
          >
            <img
              className={styles.logo_img}
              src={source}
              width="139"
              height="16"
              alt=""
              title=""
            />
          </div>
        ) : (
          ""
        )}

        {isPromotion ? (
          <div style={{ color: `rgb(${bg})` }}>
            {variant?.price?.badge?.title}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="d-flex align-items-center justify-content-end flex-grow-1">
        {variant?.price?.sold_percentage && (
          <>
            <div className={styles.promotion_sold_container}>
              <div className={styles.promotion_sold_percent_container}>
                <span
                  className={styles.promotion_sold_percent}
                  style={{ color: `rgb(${bg})` }}
                >
                  {variant?.price?.sold_percentage?.toLocaleString("fa-IR")}%
                </span>
                فروش رفته
              </div>
              <div
                className={styles.promotion_timeline_progress}
                style={{ backgroundColor: "rgba(230, 18, 61, 0.08)" }}
              >
                <span
                  className={styles.promotion_timeline_progress__active}
                  style={{
                    backgroundColor: `rgb(${bg})`,
                    width: `${variant?.price?.sold_percentage}%`,
                  }}
                ></span>
              </div>
            </div>
            <span className={styles.space}></span>
          </>
        )}

        {showTimer && variant?.price?.timer && (
          <div
            className={styles.timer_container}
            style={{ color: `rgb(${bg})` }}
          >
            <span className={styles.promotion_timer}>
              <Timer
                seconds={variant?.price?.timer}
                onFinish={onFinishTimer}
                gapStyle="2px"
                heightStyle="26px"
              />
            </span>
            <div className="d-flex" aria-hidden="false">
              <div
                data-icon-name="cube-timer"
                data-icon="&#xEB52;"
                className={`${styles.promotion_timer_icon} cube-font-icon`}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PricingPromotion;

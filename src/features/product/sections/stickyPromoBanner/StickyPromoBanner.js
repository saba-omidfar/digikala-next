import Timer from "@/components/modules/timer/Timer";

import { useProductContext } from "@/contexts/ProductContext";
import hexToRgb from "@/utils/hexToRgb";

import styles from "./stickyPromoBanner.module.css";

function StickyPromoBanner() {
  const { activeVariant } = useProductContext();

  let color,
    bg,
    bgColor,
    soldBg,
    source = "";

  switch (activeVariant?.price?.badge?.title) {
    case "شگفت‌انگیز سفارشی":
      color = `251, 0, 143`;
      bgColor = `rgb(254, 235, 246)`;
      source =
        "https://www.digikala.com/statics/img/svg/productCard/topBadge/PromotedIncredibleOffer.svg";
      break;

    case "پیشنهاد شگفت انگیز":
      bg = `${hexToRgb(activeVariant?.price?.badge?.color)}`;
      bgColor = `rgb(242, 177, 190)`;
      soldBg = "rgb(246, 229, 233)";
      color = "231, 19, 61";
      source =
        "https://www.digikala.com/statics/img/svg/productCard/topBadge/IncredibleOffer.svg";
      break;

    case "پیشنهاد ویژه":
      source = "/images/svg/productcard/topBadge/IncredibleOffer.svg";
      break;

    case "فروش ویژه":
      source = "/images/svg/pdp/special.svg";
      color = `${hexToRgb(activeVariant?.price?.badge?.color)}`;
      bgColor = `rgb(246, 229, 233)`;
      soldBg = "rgb(246, 229, 233)";

    default:
      break;
  }

  const time = activeVariant?.price?.timer;
  const soldPercentage = activeVariant?.price?.sold_percentage;

  if (!activeVariant?.price?.badge) return;

  return (
    <div className={styles.promo_banner_container}>
      {/* Timeline */}
      <div className={styles.time_line_container}>
        <div
          className="w-100"
          style={{ backgroundColor: "rgb(242, 177, 190)" }}
        >
          <span
            className={styles.time_line}
            style={{
              width: `${soldPercentage != null ? 100 - soldPercentage : 100}%`,
              backgroundColor: `rgb(${color})`,
            }}
          ></span>
        </div>
      </div>

      <div
        className={styles.badge_logo_container}
        style={{
          backgroundColor: soldBg,
          color: `rgb(${color})`,
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <div className={styles.badge_logo} aria-hidden="true">
            <img
              className={styles.badge_logo_img}
              src={source}
              alt=""
              title=""
            />
          </div>
          {soldPercentage && (
            <span
              className={styles.price_badge_sold}
              style={{ color: `rgb(${color})` }}
            >
              {(100 - soldPercentage).toLocaleString("fa-IR")}٪ باقی مانده
            </span>
          )}
        </div>
        {time && (
          <div className="d-flex align-items-center justify-content-end flex-grow-1">
            <div
              className={styles.timer_container}
              style={{ color: `rgb(${color})` }}
            >
              <span className={styles.timer}>
                <Timer seconds={time} />
              </span>
              <div className="d-flex">
                <div
                  className={`${styles.timer_icon} cube-font-icon`}
                  data-icon-name="cube-action-time"
                  data-icon=""
                  style={{ color: `rgb(${color})` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default StickyPromoBanner;

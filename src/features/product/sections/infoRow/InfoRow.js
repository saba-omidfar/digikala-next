import Link from "next/link";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./infoRow.module.css";

const InfoRow = ({
  isLast,
  isTrustedBadge,
  icon,
  title,
  titleColor,
  chevronIcon,
  trailingIcon,
  href,
  dataIcon,
  children,
}) => {
  const Wrapper = href ? Link : "div";
  const WrapperProps = href ? { href } : {};

  return (
    <Wrapper {...WrapperProps} className={styles.info_row_container}>
      <div className={styles.info_row}>
        <div className={styles.icon_container}>
          <div
            className={`${styles.icon} cube-font-icon`}
            data-icon={String.fromCharCode(parseInt(dataIcon, 16))}
          ></div>
        </div>
      </div>
      <div className={`${styles.content} ${isLast ? styles.no_border : ""}`}>
        {title && (
          <div
            className={`d-flex align-items-center w-100 ${
              href ? "justify-content-start" : "justify-content-between"
            }`}
          >
            <span
              className={styles.title}
              style={{ color: titleColor ? titleColor : "" }}
            >
              {toPersianDigits(title)}
            </span>
            {}
            {chevronIcon ? (
              href ? (
                <div className="d-flex" aria-hidden={false}>
                  <div
                    data-icon-name="cube-nav-chevron-left"
                    data-icon={String.fromCharCode(parseInt(trailingIcon, 16))}
                    className={`${styles.trailing_icon} cube-font-icon`}
                  ></div>
                </div>
              ) : (
                <div className="d-flex" aria-hidden={false}>
                  <div
                    data-icon-name="cube-nav-chevron-left"
                    data-icon={String.fromCharCode(parseInt(chevronIcon, 16))}
                    className={`${styles.chevron_icon} cube-font-icon`}
                  ></div>
                </div>
              )
            ) : (
              ""
            )}
            {/* {isTrustedBadge && (
              <>
                <span
                  className={`${styles.badge_container} ${styles.trusted_badge}`}
                >
                  رسمی
                </span>
              </>
            )} */}
          </div>
        )}
        {children}
      </div>
    </Wrapper>
  );
};

export default InfoRow;

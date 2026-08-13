import { useState } from "react";
import Image from "next/image";

import { usePopper } from "react-popper";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./scoreBox.module.css";

export default function ScoreBox() {
  const { activeVariant } = useProductContext();

  const [isClubInfoOpen, setIsClubInfoOpen] = useState(false);
  const [clubPopperElement, setClubPopperElement] = useState(null);
  const [clubReferenceElement, setClubReferenceElement] = useState(null);

  const { styles: clubPopperStyles, attributes: clubAttributes } = usePopper(
    clubReferenceElement,
    clubPopperElement,
    {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: 8,
          },
        },
      ],
    },
  );

  return (
    <div className="w-100 px-3 d-flex align-items-center">
      <div className={styles.club_info}>
        <div className="ms-3">
          <div className={styles.club_info_img_container}>
            <Image
              width={24}
              height={24}
              src="/images/svg/club-point.svg"
              alt="clubicon"
            />
          </div>
        </div>
        <div className="d-flex w-100">
          <p className={styles.club_info_score}>
            {activeVariant?.digiclub?.point?.toLocaleString("fa-IR")} امتیاز
            دیجی‌کلاب
          </p>

          <div className={styles.club_info_warning_container}>
            <div>
              <div
                ref={setClubReferenceElement}
                className={styles.club_tooltip_text}
                onMouseEnter={() => setIsClubInfoOpen(true)}
                onMouseLeave={() => setIsClubInfoOpen(false)}
              >
                <div className="d-flex">
                  <div
                    data-icon-name="cube-nav-chevron-left"
                    data-icon="&#xE940;"
                    className={`${styles.club_info_warning_icon} cube-font-icon`}
                  ></div>
                </div>
              </div>
              {isClubInfoOpen && (
                <div
                  ref={setClubPopperElement}
                  style={clubPopperStyles.popper}
                  {...clubAttributes.popper}
                  className={`${isClubInfoOpen ? "tooltip__active" : "tooltip__inactive"} seller_tooltip`}
                >
                  بعد از پایان مهلت مرجوعی، برای دریافت امتیاز به صفحه
                  ماموریت‌های کلابی سر بزنید.
                  <div
                    style={clubPopperStyles.arrow}
                    className={styles.custom_popper_arrow}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

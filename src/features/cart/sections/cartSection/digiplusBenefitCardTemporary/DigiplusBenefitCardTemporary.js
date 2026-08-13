import React from "react";
import Image from "next/image";

import DigiplusBenefitItem from "./digiplusBenefitItem/DigiplusBenefitItem";
import PlusModal from "@/features/product/modals/plusModal/PlusModal";

import { useModal } from "@/contexts/modalContext";

import styles from "./digiplusBenefitCardTemporary.module.css";

const benefitsList = [
  {
    serviceTitle: "۴ ارسال رایگان عادی",
    serviceBadge: {
      badgeTitle: "۲ ارسال بیشتر",
      badgeIcon: "cube-badge-new-seller",
    },
  },
  {
    serviceTitle: "۲ ارسال سوپرمارکت",
    serviceBadge: {},
  },
  {
    serviceTitle: "پشتیبانی اختصاصی",
    serviceBadge: {},
  },
  {
    serviceTitle:
      "مهلت بیشتر مرجوعی کالا تا ۳۰ روز (به‌جز موبایل و کالای بهداشتی)",
    serviceBadge: {},
  },
  {
    serviceTitle: "امکان ارسال فوری بعضی از کالاها ( رایگان ):",
    serviceBadge: {},
  },
];

function DigiplusBenefitCardTemporary() {
  const { openModal } = useModal();

  return (
    <div className={styles.digiplus_benefit_container}>
      <div className={styles.digiplus_benefit}>
        <div className={styles.digiplus_benefit_item_1}>
          <div className={styles.digiplus_benefit_logo_container}>
            <Image
              width={100}
              height={30}
              style={{ objectFit: "contain" }}
              src="/images/svg/digiplus/logotype/fa.svg"
              alt=""
            />
          </div>
        </div>
        <div className={styles.digiplus_benefit_item_2}>
          <p className={styles.digiplus_benefit_item_2_text}>
            خدمات ویژه با اشتراک پلاس
          </p>
        </div>
        <div className={styles.digiplus_benefit_item_3}>
          {benefitsList.map((benefit, index) => (
            <DigiplusBenefitItem key={index} benefit={benefit} />
          ))}
          {/* <div className="d-flex flex-row justify-content-start align-items-center me-2 mt-2">
            <div className={styles.digiplus_benefit_item_3_img}>
              <Image
                width={30}
                height={30}
                style={{ objectFit: "contain" }}
                src="/images/digikala-products/a3ac1b40ff291adcfde92860b910d560d1ca55c5_1736618144.webp"
                alt=""
              />
            </div>
          </div> */}
        </div>
        <div className={styles.digiplus_benefit_item_4}>
          <button
            className={styles.digiplus_benefit_item_4_btn}
            id="cart-plus-add-to-basket"
            onClick={() => openModal("plus", <PlusModal />)}
          >
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              افزودن پلاس به سبد خرید
              <div className="d-flex me-2">
                <div
                  data-icon-name="cube-nav-chevron-left"
                  data-icon="&#xE9C2;"
                  className={`${styles.trailing_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
          </button>
        </div>
        <div className={styles.digiplus_benefit_bg_container}>
          <Image
            width={129}
            height={189}
            src="/images/svg/digiplus/digiplus-purple-pattern.svg"
            style={{ objectFit: "contain" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default DigiplusBenefitCardTemporary;

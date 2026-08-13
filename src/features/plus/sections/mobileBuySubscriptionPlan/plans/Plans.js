import { useState, useEffect } from "react";

import { useGetDigiplus } from "@/features/plus/hooks/useDigiplus";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./plans.module.css";

export default function Plans() {
  const { data, isLoading } = useGetDigiplus();

  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (data?.plans) {
      const selected = data?.plans?.find((p) => p.selected);
      setSelectedPlan(selected || data?.plans[0]);
    }
  }, [data]);

  return (
    <div className={styles.plans_container}>
      {data?.plans?.map((plan, index) => (
        <div
          key={plan.id}
          className={`${index === 0 ? styles.first_plan : ""} ${index === data?.plans?.length - 1 ? styles.last_plan : ""} ${
            selectedPlan?.id === plan?.id
              ? styles.active_plan_container
              : styles.plan_container
          }`}
        >
          <div
            className={`${styles.plan_border} ${
              selectedPlan?.id === plan?.id ? styles.plan_border__selected : ""
            }`}
          >
            {plan.selected && (
              <div className={styles.plan_recommended}>اشتراک پیشنهادی</div>
            )}
            <div
              className={`${styles.plan} ${
                selectedPlan?.id === plan?.id ? styles.plan__selected : ""
              }`}
            >
              <div className={styles.plan_title_container}>
                <span className={styles.plan_title}>
                  {plan.title.replace("اشتراک", "")}
                </span>
              </div>
              <div className={styles.plan_subtitle}>
                {`${plan.subtitle.replace("ارسال رایگان", "").replace("ارسال سوپرمارکت", "")} ارسال رایگان`}
              </div>
              <div
                className={styles.plan_discount_container}
                style={{
                  visibility:
                    plan?.discount_percent !== 0 ? "visible" : "hidden",
                }}
              >
                <div className={styles.plan_discount_badge}>
                  % {toPersianDigits(plan.discount_percent)}
                </div>
                <span className={styles.plan_old_price}>
                  {(plan.price / 10).toLocaleString("fa-IR")}
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className={styles.plan_price}>
                  {(plan.total_payable_price / 10).toLocaleString("fa-IR")}
                </span>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.price_icon}>
                    <use href="#toman"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

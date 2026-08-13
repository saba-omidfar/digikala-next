import Plans from "@/features/plus/sections/mobileBuySubscriptionPlan/plans/Plans";
import BuySubscriptionBtn from "@/features/plus/sections/buySubscriptionBtn/BuySubscriptionBtn";

import styles from "./MobileBuySubscriptionPlan.module.css";

export default function MobileBuySubscriptionPlan() {
  return (
    <div>
      <div className={styles.content}>
        <div className={styles.plans_container}>
          <div className={styles.plans_title}>
            اشتراک مد نظر خود را انتخاب کنید
          </div>
          <Plans />
          <div className={styles.purchase_plan}>
            <BuySubscriptionBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

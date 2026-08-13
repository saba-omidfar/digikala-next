import PlansSlider from "@/features/plus/sections/buySubscriptionPlan/plansSlider/PlansSlider";

import styles from "./buySubscriptionPlan.module.css";
import BuySubscriptionBtn from "../buySubscriptionBtn/BuySubscriptionBtn";

export default function BuySubscriptionPlan() {
  return (
    <div>
      <div className={styles.content}>
        <div className={styles.plans_container}>
          <div className={styles.plans_title}>
            اشتراک مد نظر خود را انتخاب کنید
          </div>
          <PlansSlider />
          <div className={styles.purchase_plan}>
            <BuySubscriptionBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

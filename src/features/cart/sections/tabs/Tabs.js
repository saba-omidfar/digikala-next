import { useCartContext } from "@/contexts/CartContext";

import styles from "./tabs.module.css";

export default function Tabs() {
  const { activeTab, setActiveTab } = useCartContext();

  return (
    <div className={styles.tabs_container}>
      <div className={styles.tabs}>
        <span
          className={`${styles.tab_item} ${
            activeTab === "next-cart" && styles.tab_active
          }`}
          onClick={() => setActiveTab("next-cart")}
        >
          سبد خرید بعدی
        </span>
        <span
          className={`${styles.tab_item} ${
            activeTab === "favorites" && styles.tab_active
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          علاقه‌مندی‌ها
        </span>
      </div>
      <div className={styles.tabs_line_container}>
        <div className={styles.tabs_line_content}>
          <div className={styles.tabs_line}></div>
        </div>
      </div>
    </div>
  );
}

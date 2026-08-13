import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";

import Rule from "./rule/Rule";

import styles from "./rulesBox.module.css";

function RulesBox() {
  const { productDetails } = useProductContext();
  const { openMobileModal } = useModal();

  return (
    <div className={styles.rules_container}>
      <h4 className={styles.rules_header}>شرایط و قوانین</h4>

      {productDetails?.category?.return_reason_alert ? (
        <Rule
          title="شرایط بازگشت کالا"
          icon="E940"
          iconName="cube-action-price-tag"
          description={productDetails?.category?.return_reason_alert}
          clickHandler={() =>
            openMobileModal("return-reason", {
              description: productDetails?.category?.return_reason_alert,
            })
          }
        />
      ) : (
        ""
      )}

      <Rule
        title="گزارش قیمت مناسب‌تر"
        icon="E91B"
        iconName="cube-action-price-tag"
        clickHandler={() => openMobileModal("price-feedback")}
      />

      <Rule
        title="گزارش مشخصات کالا یا موارد قانونی"
        icon="E911"
        iconName="cube-action-feedback"
        clickHandler={() => openMobileModal("product-feedback")}
      />

      <Rule
        title="روش قیمت‌گذاری و نظارت بر قیمت"
        icon="E9A1"
        iconName="cube-badge-money"
      />

      <Rule
        title="هشدار سامانه همتا"
        icon="E940"
        iconName="cube-alert-info-outline"
        chevronIcon="false"
        contentBox={productDetails?.category?.content_box}
        isLast
      />
    </div>
  );
}

export default RulesBox;

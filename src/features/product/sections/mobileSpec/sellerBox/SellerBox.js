import SellerInfos from "./sellerInfos/SellerInfos";
import SellerWarranty from "./sellerWarranty/SellerWarranty";
import SellerShipment from "./sellerShipment/SellerShipment";
import SellerDigiclub from "./sellerDigiclub/SellerDigiclub";

import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./sellerBox.module.css";

function SellerBox({ handleAddToCartSuccess }) {
  const { uniqueVariants } = useProductContext();
  const { openMobileModal } = useModal();

  return (
    <>
      <div id="PdpSeller" className={styles.seller_container}>
        <div className={styles.seller_header}>
          <span className={styles.seller_title}>فروشنده</span>
          <button
            type="button"
            className={styles.other_sellers_btn}
            onClick={(e) => {
              e.currentTarget.blur();
              openMobileModal("sellers", {
                uniqueVariants,
                handleAddToCartSuccess,
              });
            }}
          >
            {uniqueVariants.length > 1 && (
              <span className={styles.other_sellers_text}>
                {`انتخاب از ${(uniqueVariants.length - 1).toLocaleString("fa-IR")} فروشنده دیگر`}
              </span>
            )}
          </button>
        </div>
        <SellerInfos />
        <SellerWarranty />
        <SellerShipment />
        {/* <SellerDigiclub /> */}
      </div>
    </>
  );
}

export default SellerBox;

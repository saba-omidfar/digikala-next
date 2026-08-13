import { useProductContext } from "@/contexts/ProductContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import styles from "./dkp.module.css";

export default function Dkp() {
  const { showSnackbar } = useSnackbar();

  const { productDetails, activeVariant, lowestPrice } = useProductContext();
  const hasLowestPrice = activeVariant?.price?.selling_price > lowestPrice;

  const copyProductIdHandler = () => {
    navigator.clipboard.writeText(productDetails?.id).then(() => {
      showSnackbar("شناسه کالا کپی شد.");
    });
  };

  return (
    <section id="DKP" style={{ paddingBottom: hasLowestPrice ? 140 : 100 }}>
      <hr className="line-8" />
      <div className={styles.dkp} onClick={copyProductIdHandler}>
        شناسه این کالا
        <span className={styles.dkp_title}>
          DKP- {productDetails?.id}
          <div className="d-flex" aria-hidden="false">
            <svg className={styles.copy_icon}>
              <use href="#copy"></use>
            </svg>
          </div>
        </span>
      </div>
    </section>
  );
}

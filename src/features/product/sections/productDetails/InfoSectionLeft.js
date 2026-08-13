import ProductTitle from "./ProductTitle";
import VariantInfo from "./VariantInfo";
import Insurance from "./buyBox/insurance/Insurance";
import Spec from "./Spec";
import TouchPoints from "./TouchPoints";
import BuyBox from "./buyBox/BuyBox";

import styles from "./infoSectionLeft.module.css";

function InfoSectionLeft() {
  return (
    <div className={styles.info_section_left_container}>
      <ProductTitle />
      <div className={styles.info_section_left}>
        <VariantInfo />
        <Insurance />
        <Spec />
        <TouchPoints />
        <BuyBox />
      </div>
    </div>
  );
}

export default InfoSectionLeft;

import Link from "next/link";
import Image from "next/image";

import styles from "./categoryCard.module.css";

function categoryCard({ subCategory }) {
  return (
    <Link
      className={styles.category_card_link}
      id="plp-shortcut-category"
      href={subCategory?.url?.uri}
    >
      <div className={styles.category_card__image_container}>
        <Image
          className={styles.category_card__image}
          src={subCategory?.top_product_image}
          width={85}
          height={85}
          alt={subCategory?.title_fa}
          title=""
        />
      </div>
      <div className={styles.category_card__title}>{subCategory?.title_fa}</div>
    </Link>
  );
}
export default categoryCard;

import Image from "next/image";
import styles from "./addToListModal.module.css";

function IdeaBox({ imgSrc, title }) {
  return (
    <div className={styles.wishlist__idea_box}>
      <div className={styles.idea_box_img_container}>
        <Image
          className="w-100 d-inline-block"
          src={imgSrc}
          width={36}
          height={36}
          alt={title}
          title=""
          style={{ objectFit: "contain" }}
        />
      </div>
      <span className={styles.idea_box_title}>{title}</span>
    </div>
  );
}
export default IdeaBox;

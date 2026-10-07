import styles from "./listItem.module.css";

export default function ListItem({ image }) {
  return (
    <div aria-hidden="true" aria-label="" className={styles.list_img_container}>
      <picture>
        <source type="image/webp" srcSet={image?.url?.[0]} />
        <source type="image/jpeg" srcSet={image?.url?.[0]} />
        <img
          className={styles.list_img}
          alt=""
          title=""
          src={image?.url?.[0]}
        />
      </picture>
    </div>
  );
}

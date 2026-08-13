import Link from "next/link";

import styles from "./articleBox.module.css";

function ArticleBox({ article }) {
  return (
    <Link
      className={styles.article_link}
      href={article.digikalaMagazineNewsUrl}
    >
      <div className={styles.article_img_container}>
        <img
          className={styles.article_img}
          src={article.digikalaMagazineNewsImage.imageSrc}
          alt={article.digikalaMagazineNewsTitle}
        />
      </div>
      <div className={styles.article_caption}>
        {article.digikalaMagazineNewsTitle}
      </div>
    </Link>
  );
}

export default ArticleBox;

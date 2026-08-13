import Link from "next/link";

import styles from "./productList.module.css";

export default function ProductListBanners({ banners }) {
  if (!banners?.length) return null;

  return (
    <div className={styles.banner_container}>
      {banners.map((banner) => (
        <Link
          key={banner.title}
          href={banner?.url?.url || "#"}
          target="_blank"
          className="d-block h-100 w-100"
        >
          <div className={styles.banner}>
            <div className={styles.banner_img_container} aria-hidden="true">
              <img
                src={banner?.image?.url}
                alt=""
                title={banner?.title}
                className={styles.banner_img}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

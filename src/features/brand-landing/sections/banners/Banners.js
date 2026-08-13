import Link from "next/link";

import styles from "./banners.module.css";

export default function Banners({
  banners,
  gridTemplateColumns,
  bannerImgContainer,
}) {
  return (
    <div className={styles.banners_container} style={{ gridTemplateColumns }}>
      {banners?.map((banner) => (
        <Link
          key={banner.id}
          href={banner?.url?.uri || "#"}
          className="d-block position-relative w-100"
        >
          <div>
            <div
              className={`${styles.banner_img_conainer} ${bannerImgContainer}`}
              role="img"
              aria-hidden="false"
              aria-label={banner?.title}
            >
              <picture>
                <source type="image/webp" srcSet={banner?.webp_image} />
                <source type="image/jpeg" srcSet={banner?.image} />
                <img
                  className={styles.banner_img}
                  src={banner?.image}
                  alt={banner?.title}
                  title={banner?.title}
                />
              </picture>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

import Link from "next/link";

import styles from "./middleBanners.module.css";

export default function MiddleBanners({
  middleRightBanners,
  middleSecondtBanners,
}) {
  if (middleRightBanners && !middleSecondtBanners) return null;

  return (
    <div className={styles.banner_container}>
      {middleRightBanners?.map((banner) => (
        <Link key={banner?.id} href={banner?.url?.uri || "#"}>
          <div>
            <div
              className={styles.banner_img_container}
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

      <div className={styles.banners_container}>
        {middleSecondtBanners?.map((banner) => (
          <Link key={banner?.id} href={banner?.url?.uri || "#"}>
            <div>
              <div
                className={styles.banners_img_container}
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
    </div>
  );
}

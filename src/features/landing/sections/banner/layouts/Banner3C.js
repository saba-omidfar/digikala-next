import Link from "next/link";

import styles from "../banner.module.css";

export default function Banner3C({ desktopBanners }) {
  return (
    <div className={styles.banners_container}>
      {desktopBanners?.map((banner) => (
        <div key={banner?.image?.id} className="w-100">
          <Link
            className={styles.banner_link}
            target="_blank"
            href={banner?.url?.uri || "#"}
          >
            <div>
              <div className={styles.one_banner_img_container}>
                <picture>
                  <source type="image/webp" srcSet={banner?.image?.webp_url} />
                  <source type="image/jpeg" srcSet={banner?.image?.url} />
                  <img
                    className={styles.one_banner_img}
                    src={banner?.image?.url}
                    alt=""
                  />
                </picture>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

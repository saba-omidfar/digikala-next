import Link from "next/link";

import styles from "./banners.module.css";

function Banners({ data, topBanners, middleBanners }) {
  return (
    <div
      className={`${topBanners ? styles.top_banners_container : ""} ${middleBanners ? styles.middle_banners_container : ""}`}
    >
      {data?.map((banner) => (
        <Link
          key={banner?.id}
          className="w-100 d-block position-relative"
          target="_blank"
          aria-label={banner?.title}
          aria-hidden="false"
          bannerdescription=""
          bannershowpages="homePage"
          bannerproducts=""
          bannersrc={banner?.image}
          href={banner?.url?.uri}
        >
          <div>
            <div
              className={`${topBanners ? styles.top_banner : ""} ${middleBanners ? styles.middle_banner : ""}`}
              aria-hidden="false"
              aria-label={banner?.title}
            >
              <picture>
                <source type="image/webp" srcSet={banner?.webp_image} />
                <source type="image/jpeg" srcSet={banner?.image} />
                <img
                  className={styles.banner_image}
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
export default Banners;

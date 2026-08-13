import Link from "next/link";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./banner.module.css";

function Banner({ banners }) {
  const { isSmallSreen } = useScreenStatus();

  if (!banners?.desktop?.length || !banners?.mobile?.length) return;

  return (
    <div className={styles.banner_container}>
      {(isSmallSreen ? banners?.desktop : banners?.mobile)?.map((banner) => (
        <Link
          key={banner.image.id}
          className={styles.banner_link}
          target="_self"
          aria-label=""
          aria-hidden="true"
          href={banner ? banner?.url?.uri : "#"}
        >
          <div>
            <div
              className={styles.banner_img_container}
              aria-hidden="true"
              aria-label=""
            >
              <img
                className={styles.banner_img}
                src={banner?.image?.url}
                alt=""
                title=""
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Banner;

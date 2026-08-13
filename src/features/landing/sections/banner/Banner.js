import Banner3C from "@/features/landing/sections/banner/layouts/Banner3C";
import Banner1A4A from "@/features/landing/sections/banner/layouts/Banner1A4A";
import Banner2B from "@/features/landing/sections/banner/layouts/Banner2B";
import Banner4A from "@/features/landing/sections/banner/layouts/Banner4A";
import Banner4B from "@/features/landing/sections/banner/layouts/Banner4B";
import Banner1D from "@/features/landing/sections/banner/layouts/Banner1D";
import BannerDefault from "@/features/landing/sections/banner/layouts/BannerDefault";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./banner.module.css";

export default function Banner({ data }) {
  const { isSmallScreen } = useScreenStatus();

  const type = data?.data?.type || data?.type;

  const props = {
    desktopBanners: data?.data?.desktop || [],
    mobileBanners: data?.data?.mobile || [],
    isSmallScreen,
  };

  const layouts = {
    "1A4A": Banner1A4A,
    "3C": Banner3C,
    "2B": Banner2B,
    "4A": Banner4A,
    "4B": Banner4B,
    "1D": Banner1D,
  };

  const Layout = layouts[type] || BannerDefault;

  return (
    <div className="w-100 d-flex justify-content-center overflow-hidden position-relative">
      <div className={styles.content}>
        <div className={styles.content_container} id={data?.widget_id}>
          {data?.data?.title && (
            <p className={styles.banner_title}>{data?.data?.title}</p>
          )}
          <div className={styles.container}>
            <Layout {...props} />
          </div>
        </div>
      </div>
    </div>
  );
}

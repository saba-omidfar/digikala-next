import { useParams } from "next/navigation";

import useScreenStatus from "@/hooks/useScreenStatus";

import { useListing } from "@/contexts/ListingContext";

import styles from "./brand.module.css";

export default function Brand() {
  const { brand } = useParams();
  const { data, isLoading } = useListing();
  const { isSmallScreen } = useScreenStatus();

  const title =
    data?.category?.title_fa ||
    data?.tag?.name ||
    data?.brand?.title_fa ||
    data?.page_label;

  if (
    isSmallScreen ||
    (!brand &&
      !data?.category &&
      !data?.page_label &&
      !data?.tag &&
      !data?.brand)
  )
    return null;

  return (
    <div className={styles.brand_code}>
      {isLoading ? (
        <div
          className={`${styles.brand_code_skeleton} skeleton_no_animation`}
        ></div>
      ) : (
        <>
          {data?.brand?.url && (
            <div className={styles.brand_logo}>
              <div
                role="img"
                aria-hidden="false"
                aria-label={data?.brand?.title_fa}
                className={styles.brand_img_container}
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet={data?.brand?.logo?.url?.[0]}
                  />
                  <source
                    type="image/jpeg"
                    srcSet={data?.brand?.logo?.url?.[0]}
                  />
                  <img
                    className={styles.brand_img}
                    src={data?.brand?.logo?.url?.[0]}
                    width="50"
                    height="50"
                    alt={data?.brand?.title_fa}
                    title=""
                  />
                </picture>
              </div>
            </div>
          )}
          <div className="d-flex flex-column">
            <h1 className={styles.brand_code_title}>
              {`${title} ${brand ? data?.brand?.title_fa : ""}`}
            </h1>
            {/* <p className={styles.brand_code_subtitle}>
              کالاهای ثبت شده با این برند
            </p> */}
          </div>
        </>
      )}
    </div>
  );
}

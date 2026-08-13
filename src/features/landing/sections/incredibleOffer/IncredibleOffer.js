import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import toPersianDigits from "@/utils/toPersianDigits";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./incredibleOffer.module.css";

function IncredibleOffer({ data }) {
  const { isSmallScreen } = useScreenStatus();
  const router = useRouter();

  return (
    <div className="w-100 d-flex justify-content-center overflow-hidden position-relative">
      <div className={styles.content}>
        <div className={styles.container} id={data?.widget_id}>
          <div>
            <div
              className={styles.see_more_link}
              onClick={() => router.push(data?.data?.see_more_url?.uri)}
            >
              <div className={styles.content_bg}></div>
              <div className={styles.content_gradient}></div>
              <div className={styles.content_logo_container}>
                <div className="d-flex align-items-center z-1 flex-shrink-0">
                  <div
                    aria-hidden="false"
                    aria-label="icon"
                    className={styles.content_logo_img_container}
                  >
                    <picture>
                      <source
                        type="image/webp"
                        srcSet="/images/png/amazing/incredible.webp"
                      />
                      <source
                        type="image/jpeg"
                        srcSet="/images/png/amazing/incredible.png"
                      />
                      <img
                        className={styles.content_logo_img}
                        src="/images/png/amazing/incredible.png"
                        alt="icon"
                        title=""
                      />
                    </picture>
                  </div>
                  <div
                    aria-hidden="true"
                    aria-label=""
                    className={styles.content_text_img_container}
                  >
                    <Image
                      className={styles.content_text_img}
                      src="/images/svg/typography/incredible.svg"
                      width={250}
                      height={28}
                      alt=""
                      title=""
                    />
                  </div>
                </div>
                {!data?.data?.discount_percent ? (
                  ""
                ) : (
                  <div className={styles.content_title_badge}>
                    <p className={styles.content_title_badge__text}>
                      تا {toPersianDigits(data?.data?.discount_percent)}٪ تخفیف
                    </p>
                  </div>
                )}
              </div>
              <div className={styles.content_product_items_container}>
                <div className={styles.content_product_items}>
                  {data?.data?.products
                    ?.slice(0, isSmallScreen ? 3 : 6)
                    .map((product) => (
                      <Link
                        key={product?.id}
                        className={styles.product_link}
                        href={product?.url?.uri}
                      >
                        <div className={styles.product_img_rounded}>
                          <div
                            aria-hidden="false"
                            aria-label={product?.title_fa}
                            className={styles.product_img_container}
                          >
                            <picture>
                              <source
                                type="image/webp"
                                srcSet={product?.images?.main?.webp_url?.[0]}
                              />
                              <source
                                type="image/jpeg"
                                srcSet={product?.images?.main?.url?.[0]}
                              />
                              <img
                                className={styles.product_img}
                                src={product?.images?.main?.url?.[0]}
                                width="58"
                                height="58"
                                alt={product?.title_fa}
                                title=""
                              />
                            </picture>
                          </div>
                        </div>
                        <div
                          className={styles.product_price__discount_container}
                        >
                          <span
                            className={styles.product_price__discount}
                            data-testid="price-discount-percent"
                          >
                            {toPersianDigits(
                              product?.default_variant?.price?.discount_percent,
                            )}
                            ٪
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
                <div
                  className={`${styles.content_mobile_btn} ${styles.content_btn}`}
                >
                  <div className="d-flex" aria-hidden="false">
                    <div
                      data-icon-name="cube-arrow-left"
                      data-icon="&#xE956;"
                      className={`${styles.content_icon} cube-font-icon`}
                    ></div>
                  </div>
                </div>
                <div
                  className={`${styles.content_desktop_btn} ${styles.content_btn}`}
                >
                  <span className={styles.content_btn_text}>
                    بیش از{" "}
                    {data?.data?.products_count
                      ? toPersianDigits(data?.data?.products_count)
                      : toPersianDigits(0)}{" "}
                    کالا
                  </span>
                  <div
                    className={styles.content_icon_container}
                    aria-hidden="false"
                  >
                    <div
                      data-icon-name="cube-arrow-left"
                      data-icon="&#xE956;"
                      className={`${styles.content_icon} cube-font-icon`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncredibleOffer;

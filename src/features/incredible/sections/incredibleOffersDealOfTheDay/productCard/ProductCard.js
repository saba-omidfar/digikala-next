import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

import Timer from "@/components/modules/timer/Timer";

import toPersianDigits from "@/utils/toPersianDigits";

import { useUserContext } from "@/contexts/UserContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useGetIncredibleNotificationStatus } from "@/hooks/useProduct";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./productCard.module.css";

export default function ProductCard({ product, lastBox, isIncrediblePage }) {
  const router = useRouter();

  const { isSmallScreen } = useScreenStatus();

  const { showSnackbar } = useSnackbar();
  const { user } = useUserContext();
  const { addIncredibleNotification, removeIncredibleNotification } =
    useProductContext();

  const { data: incredibleStatus, isLoading: isLoadingIncredibleStatus } =
    useGetIncredibleNotificationStatus({ productId: product?.id });

  const notifeMeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoadingIncredibleStatus) return;

    if (!user) {
      router.push("/users/login");
      return;
    }

    if (incredibleStatus?.is_active) {
      removeNotificationHandler();
    } else {
      addNotificationHandler();
    }
  };

  const addNotificationHandler = () => {
    addIncredibleNotification(
      {
        productId: product?.id,
      },
      {
        onSuccess: () => {
          showSnackbar("اطلاع‌رسانی شگفت‌انگیز ثبت شد.");
        },
      },
    );
  };

  const removeNotificationHandler = () => {
    removeIncredibleNotification(
      {
        productId: product?.id,
      },
      {
        onSuccess: () => {
          showSnackbar("اطلاع‌رسانی شگفت‌انگیز حذف شد.");
        },
      },
    );
  };

  return (
    <div className={styles.product_container}>
      <Link
        href={product?.url?.uri || "#"}
        target="_blank"
        className={`${!product ? styles.no_product_link : styles.product_link}`}
      >
        <div className={styles.product_card} id="product-card">
          <article className="overflow-hidden d-flex flex-column align-items-stretch justify-content-start">
            <div className="d-flex align-items-center justify-content-start mb-1">
              {product && (
                <>
                  <div className={styles.product_ad_logo_container}>
                    <Image
                      width={116}
                      height={14}
                      src="/images/svg/productcard/topBadge/IncredibleOffer.svg"
                      alt=""
                      className={styles.product_ad_logo}
                    />
                  </div>
                  <div className={styles.product_ad_logo_text}>
                    <br />
                  </div>
                </>
              )}
            </div>
            <div className={styles.product_content_container}>
              <div className={styles.product_content}>
                <div
                  className={`d-flex ${
                    isSmallScreen ? "align-items-center mx-auto" : "flex-column"
                  }`}
                >
                  <div>
                    <div className={styles.product_img_container}>
                      <Image
                        width={isSmallScreen ? 136 : 200}
                        height={isSmallScreen ? 136 : 200}
                        src={
                          product
                            ? product?.images.main.url[0]
                            : "/images/png/amazing/deal_of_the_day.png"
                        }
                        alt={product ? product?.title_fa : ""}
                        className={styles.product_img}
                        style={{ mixBlendMode: !lastBox ? "multiply" : "" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
                <div
                  className="d-flex align-items-center justify-content-start flex-wrap"
                  style={{ gap: "4px", marginBottom: "4px" }}
                >
                  <br />
                </div>
                <div>
                  <h3 className={styles.product_title}>{product?.title_fa}</h3>
                </div>
                <div className="mb-1 d-flex align-items-center justify-content-between">
                  <div className={styles.product_color_container}>
                    <div
                      className={styles.product_color}
                      style={{
                        background:
                          product?.second_default_variant?.color?.hex_code,
                      }}
                    ></div>
                    <p className={styles.product_color_name}>
                      {product?.second_default_variant?.color?.title}
                    </p>
                  </div>
                  {isSmallScreen ? (
                    <>
                      <div className="d-flex align-items-center">
                        <p className={styles.empty_space}>&amp;nbsp;</p>
                        <br />
                      </div>
                      {!lastBox && product?.rating.rate !== 0 && (
                        <div className="d-flex align-items-center">
                          {product ? (
                            <>
                              <p className={styles.product_rating_rate}>
                                {toPersianDigits(
                                  Math.round(
                                    (product?.rating?.rate / 100) * 5 * 10,
                                  ) / 10,
                                )}
                              </p>
                              <div
                                className={styles.product_rating_icon_container}
                              >
                                <div
                                  className={`${styles.product_rating_icon} cube-font-icon`}
                                  data-icon-name="cube-star-fill"
                                  data-icon="&#xE928;"
                                ></div>
                              </div>
                            </>
                          ) : (
                            <br />
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>

                {/* Price */}
                <div className={styles.product_price_container}>
                  <div className="d-flex align-items-center justify-content-between">
                    {product?.default_variant?.price?.discount_percent ? (
                      <div className={styles.product_price}>
                        <span className={styles.product_price_percent}>
                          {product?.default_variant?.price.discount_percent?.toLocaleString(
                            "fa-IR",
                          )}
                          %
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className={styles.product_price_final}>
                      {product ? (
                        <>
                          <span>
                            {(
                              product?.default_variant?.price?.selling_price /
                              10
                            ).toLocaleString("fa-IR")}
                          </span>
                          <div className="d-flex justify-content-center align-items-center">
                            <div
                              className={`${styles.product_icon} cube-font-icon`}
                              data-icon-name="cube-value-toman"
                              data-icon="&#xE953;"
                            ></div>
                          </div>
                        </>
                      ) : (
                        <br />
                      )}
                    </div>
                  </div>
                  <div className={styles.product_price_no_discount}>
                    {product ? (
                      <div className={styles.product_price_no_discount_text}>
                        {(
                          product?.default_variant?.price?.rrp_price / 10
                        ).toLocaleString("fa-IR")}
                      </div>
                    ) : (
                      <br />
                    )}
                  </div>
                </div>
                {product ? (
                  <div className="mt-auto">
                    {product?.default_variant?.price?.timer === 0 ? (
                      <div
                        className={
                          styles.product_promotion_timeline_progress_ended_container
                        }
                      >
                        <span
                          className={
                            styles.product_promotion_timeline_progress_ended
                          }
                        ></span>
                        <span
                          className={
                            styles.product_promotion_timeline_progress_ended_text
                          }
                        >
                          پایان تخفیف
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div
                          className={`${
                            styles.product_promotion_timeline_progress
                          } ${
                            product?.default_variant.price?.sold_percentage
                              ? "visible"
                              : "invisible"
                          } `}
                        >
                          <div
                            className={
                              styles.product_promotion_timeline_progress_active
                            }
                            style={{
                              width: `${product?.default_variant.price?.sold_percentage}%`,
                            }}
                          ></div>
                        </div>
                        <div className="d-flex justify-content-between pt-1">
                          <div
                            className={
                              product?.default_variant.price?.sold_percentage
                                ? "visible"
                                : "invisible"
                            }
                          >
                            <span className={styles.product_soldout_percent}>
                              {product?.default_variant.price?.sold_percentage?.toLocaleString(
                                "fa-IR",
                              )}
                              %
                            </span>
                            <span className={styles.product_soldout_text}>
                              فروش رفته
                            </span>
                          </div>
                          {product?.default_variant?.price?.timer && (
                            <div
                              className={
                                styles.product_promotion_timeline__timer
                              }
                            >
                              <Timer
                                seconds={product?.default_variant?.price?.timer}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <br />
                )}
              </div>
            </div>
          </article>
        </div>
      </Link>
      {lastBox ? (
        <div className={styles.overlay}>
          <div className={styles.overlay_lock_btn}>
            <div
              data-icon-name="cube-lock"
              data-icon="&#xEA11;"
              className={`${styles.overlay_lock_icon} cube-font-icon`}
            ></div>
          </div>
          <div className={styles.overlay_text_container}>
            <span className={styles.overlay_text}>
              {isSmallScreen ? (
                <>
                  شروع تخفیف
                  <br />
                  از{" "}
                  {!isIncrediblePage ? (
                    <Timer
                      seconds={product?.default_variant?.price?.start_timer}
                    />
                  ) : (
                    "ساعاتی"
                  )}{" "}
                  دیگر
                </>
              ) : (
                <span className="text-center">شروع تخفیف از ساعاتی دیگر </span>
              )}
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {product?.promotion_type === "teasing" ? (
        <div className={styles.overlay}>
          <div className={styles.overlay_lock_btn}>
            <div
              data-icon-name="cube-lock"
              data-icon="&#xEA11;"
              className={`${styles.overlay_lock_icon} cube-font-icon`}
            ></div>
          </div>
          <div className={styles.overlay_text_container}>
            <span className={styles.overlay_text}>
              {isSmallScreen ? (
                <>
                  شروع تخفیف
                  <br />
                  از{" "}
                  {!isIncrediblePage ? (
                    <Timer
                      seconds={product?.default_variant?.price?.start_timer}
                    />
                  ) : (
                    "ساعاتی"
                  )}{" "}
                  دیگر
                </>
              ) : (
                <span className="text-center">
                  شروع تخفیف از
                  {!isIncrediblePage ? (
                    <span className={styles.timer_container}>
                      <Timer
                        seconds={product?.default_variant?.price?.start_timer}
                      />
                    </span>
                  ) : (
                    "ساعاتی"
                  )}
                  دیگر{" "}
                </span>
              )}
            </span>
            <button
              className={`${incredibleStatus?.is_active ? styles.dont_notife_me_btn : styles.notife_me_btn} `}
              onClick={notifeMeHandler}
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                <div
                  className={styles.notification_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.notification_icon}>
                    <use href="#notificationOffOutline"></use>
                  </svg>
                </div>
                {incredibleStatus?.is_active ? "دیگر خبرم نکن" : "خبرم کن"}
              </div>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import toPersianDigits from "@/utils/toPersianDigits";
import useHorizontalProducts from "@/features/main/hooks/useHorizontalProducts";

import Spinner from "@/utils/Spinner";

import styles from "./horizontalProducts.module.css";

export default function HorizontalProducts({ data }) {
  const { products, activeTab, loading, handleTabClick } =
    useHorizontalProducts(data);

  return (
    <div className="w-100">
      <section className={styles.container}>
        <div className={styles.title}>
          <span>{data?.title}</span>
          <Link
            className={styles.see_all_link}
            href={
              data?.see_more?.url.replace("https://www.digikala.com", "") || "#"
            }
          >
            مشاهده همه
            <div className="d-flex">
              <svg className={styles.chevron_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </Link>
        </div>

        <div className={styles.content}>
          {data?.tabs?.length ? (
            <div
              className={styles.tab_list}
              role="tablist"
              aria-label="دسته‌بندی کالاها"
              aria-busy={loading}
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === null}
                className={`${styles.tab} ${
                  activeTab === null ? styles.tab_active : ""
                }`}
                onClick={() => handleTabClick()}
              >
                همه
              </button>

              {data?.tabs?.map((tab) => (
                <button
                  key={tab.index}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.index}
                  className={`${styles.tab} ${
                    activeTab === tab.index ? styles.tab_active : ""
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.tab_title}
                </button>
              ))}
            </div>
          ) : (
            ""
          )}

          <section className={styles.products_container}>
            {loading ? (
              <div className={styles.loading_container}>
                <Spinner size={40} color="rgb(237, 25, 68)" />
              </div>
            ) : (
              <div className="w-100">
                <Swiper
                  spaceBetween={12}
                  slidesPerView="auto"
                  navigation={{
                    prevEl: ".products-swiper-button-prev",
                    nextEl: ".products-swiper-button-next",
                  }}
                  modules={[Navigation]}
                  className={styles.slider}
                >
                  <SwiperSlide className={styles.product_slide}>
                    <span aria-hidden="true" className={styles.edge} />
                  </SwiperSlide>

                  {products?.map((product) => (
                    <SwiperSlide
                      key={product.id}
                      className={styles.product_slide}
                    >
                      <div className={styles.product_item}>
                        <Link
                          className={styles.product_link}
                          href={product.url?.uri || "#"}
                        >
                          <div
                            role="img"
                            aria-label={product.title}
                            className={styles.product_img_container}
                          >
                            <img
                              className={styles.product_img}
                              width="164"
                              height="164"
                              alt={product.title}
                              src={product.image?.url}
                            />
                          </div>

                          <div className={styles.product_infos}>
                            <p className={styles.product_title}>
                              {product.title}
                            </p>

                            <div className={styles.product_price}>
                              {product.price?.discount_percent ? (
                                <div className="d-flex justify-content-start align-items-center gap-1">
                                  <div
                                    className={styles.product_discount_percent}
                                  >
                                    <span className={styles.product_discount}>
                                      {toPersianDigits(
                                        product.price?.discount_percent ?? 0,
                                      )}
                                      ٪
                                    </span>
                                  </div>

                                  <span className={styles.product_rrp_price}>
                                    {(
                                      (product.price?.rrp_price ?? 0) / 10
                                    ).toLocaleString("fa-IR")}
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}

                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                  <span
                                    className={styles.product_selling_price}
                                  >
                                    {(
                                      (product.price?.selling_price ?? 0) / 10
                                    ).toLocaleString("fa-IR")}
                                  </span>

                                  <svg className={styles.product_price_icon}>
                                    <use href="#toman" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}

                  <SwiperSlide className={styles.product_slide}>
                    <span aria-hidden="true" className={styles.edge} />
                  </SwiperSlide>

                  <div className="products-swiper-button-next">
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.swiper_btn_icon}>
                        <use href="#chevronLeft" />
                      </svg>
                    </div>
                  </div>

                  <div className="products-swiper-button-prev">
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.swiper_btn_icon}>
                        <use href="#chevronRight" />
                      </svg>
                    </div>
                  </div>
                </Swiper>
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}

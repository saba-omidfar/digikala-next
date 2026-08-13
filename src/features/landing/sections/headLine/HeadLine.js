import { useRouter } from "next/navigation";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./headLine.module.css";

function HeadLine({ data }) {
  const router = useRouter();

  const goToPage = () => {
    router.push(data?.data?.primary_action_link);
  };

  if (!data?.data?.media_data) return;

  return (
    <div className="d-flex justify-content-center position-relative overflow-hidden">
      <div className={styles.container}>
        <div className={styles.content_container} id={data?.widget_id}>
          <div className={styles.content}>
            <div className={styles.side_panel}>
              <h3 className={styles.side_panel_title}>{data?.data?.title}</h3>
              <p className={styles.side_panel_description}>
                {data?.data?.description}
              </p>
              <ul className={styles.side_panel_options}>
                {data?.data?.values?.map((value, index) => (
                  <li key={index} className={styles.side_panel_option}>
                    {value}
                  </li>
                ))}
              </ul>
              <div className={styles.side_panel_action_btn} onClick={goToPage}>
                <Link
                  className={styles.side_panel_action_link}
                  type="submit"
                  target="_blank"
                  href="https://www.digikala.com/product_list/plp_293331789/"
                >
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    {data?.data?.primary_action_text}
                  </div>
                </Link>
              </div>
            </div>
            <div className={styles.slider}>
              <div className="position-relative h-100">
                <div className="h-100">
                  <Swiper
                    className={styles.headline_slider}
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={{
                      nextEl: ".headline__next-button-selector",
                      prevEl: ".headline__prev-button-selector",
                    }}
                    pagination={{
                      el: ".headline_pagination",
                      type: "custom",
                      renderCustom: function (swiper, current, total) {
                        let bullets = "";

                        for (let i = 1; i <= total; i++) {
                          bullets += `<span class="slider_pagination__dot__medium ${
                            i === current
                              ? "slider_pagination__dot__current"
                              : ""
                          }"></span>`;
                        }

                        return bullets;
                      },
                    }}
                    modules={[Navigation, Pagination]}
                  >
                    {data?.data?.media_data?.map((media, index) => (
                      <SwiperSlide
                        key={index}
                        className={styles.headline_slide}
                      >
                        <div>
                          <Link
                            className="h-100"
                            target="_blank"
                            href={media?.url?.uri}
                          >
                            <div
                              className={styles.media_img_container}
                              aria-hidden="true"
                              aria-label=""
                            >
                              <picture>
                                <source
                                  type="image/webp"
                                  srcSet={media?.image?.webp_url}
                                />
                                <source
                                  type="image/jpeg"
                                  srcSet={media?.image?.url}
                                />
                                <img
                                  className={styles.media_img}
                                  src={media?.image?.url}
                                  alt=""
                                  title=""
                                />
                              </picture>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Next & Prev Buttons */}
                  {data?.data?.media_data?.length > 1 ? (
                    <>
                      <div className="headline__next-button-selector">
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.swiper_btn_icon}>
                            <use href="#chevronLeft"></use>
                          </svg>
                        </div>
                      </div>
                      <div className="headline__prev-button-selector">
                        <svg className={styles.swiper_btn_icon}>
                          <use href="#chevronRight"></use>
                        </svg>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {/* Pagination */}
                {data?.data?.media_data?.length > 1 ? (
                  <div className="headline_swiper-pagination">
                    <div className="headline_pagination"></div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadLine;

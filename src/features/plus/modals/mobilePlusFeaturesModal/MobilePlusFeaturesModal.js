import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import PlusQuestions from "@/features/plus/sections/plusQuestions/PlusQuestions";
import PlusModal from "@/features/product/modals/plusModal/PlusModal";

import { useModal } from "@/contexts/modalContext";

import styles from "./mobilePlusFeaturesModal.module.css";

export default function MobilePlusFeaturesModal({ features }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { openModal, closeModal } = useModal();

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className="d-flex align-items-center">
          <div className={styles.header}>
            <div className="d-flex align-items-center">
              <div
                className={styles.close_icon_container}
                aria-hidden="false"
                onClick={() => closeModal("plus-features-mobile")}
              >
                <svg className={styles.close_icon}>
                  <use href="#arrowRight"></use>
                </svg>
              </div>
              <div
                role="img"
                aria-hidden="false"
                aria-label="logo-type"
                className={styles.header_logo_container}
              >
                <img
                  className={styles.header_logo}
                  src="/statics/img/svg/digiplus/landing/logo-type.svg"
                  width="59"
                  height="24"
                  alt="logo-type"
                  title=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="feature-modal"
        className="flex-grow-1 d-flex flex-column overflow-y-auto"
      >
        <div className="flex-grow-1 d-flex flex-column">
          <div className={styles.content_bg}>
            <div className="d-flex">
              <div className={styles.content}>
                <div>
                  <Swiper
                    className={styles.feature_slider}
                    slidesPerView={1}
                    spaceBetween={0}
                    autoHeight
                    onSlideChange={(swiper) => {
                      setActiveIndex(swiper.realIndex);
                    }}
                  >
                    {features?.map((feature) => (
                      <SwiperSlide
                        key={feature.type}
                        className={styles.feature_slide}
                      >
                        <div>
                          <div
                            className={styles.feature_img_container}
                            aria-hidden="true"
                            aria-label=""
                          >
                            <picture>
                              <source
                                type="image/webp"
                                srcSet={feature?.image}
                              />
                              <source
                                type="image/jpeg"
                                srcSet={feature?.image}
                              />
                              <img
                                className={styles.feature_img}
                                src={feature?.image}
                                alt=""
                                title=""
                              />
                            </picture>
                          </div>
                          <div className={styles.feature_description}>
                            <div className={styles.feature_description_title}>
                              {feature.title}
                            </div>
                            <div className={styles.feature_description_text}>
                              <div
                                dir="rtl"
                                dangerouslySetInnerHTML={{
                                  __html: feature.description || "",
                                }}
                              />
                            </div>
                          </div>
                          <div className={styles.feature_questions}>
                            <div className={styles.questions_content}>
                              <h3 className={styles.questions_title}>
                                سوالات متداول
                              </h3>
                              <PlusQuestions />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer_container}>
        <div className={styles.footer}>
          <div className={styles.navigation_container}>
            {features?.map((feature, index) => (
              <span
                key={feature.type}
                className={`${styles.pagination_bullet} ${
                  activeIndex === index ? styles.pagination_bullet_active : ""
                }`}
              ></span>
            ))}
          </div>

          <button
            className={styles.footer_btn}
            onClick={() =>
              openModal(<PlusModal />, {
                name: "plus",
                className: "modal__plus rounded-medium",
              })
            }
          >
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              خرید اشتراک
              <div
                className={styles.chevron_icon_container}
                aria-hidden="false"
              >
                <svg className={styles.chevron_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

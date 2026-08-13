import { useState } from "react";

import PlusQuestions from "@/features/plus/sections/plusQuestions/PlusQuestions";

import { useModal } from "@/contexts/modalContext";

import styles from "./plusFeaturesModal.module.css";

export default function PlusFeaturesModal({ features }) {
  const { closeModal } = useModal();

  const [activeFeature, setActiveFeature] = useState(features?.[0]);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className="d-flex align-items-center">
          <div className={styles.title_container}>
            <div className="d-flex justify-content-between align-items-center">
              <div className={styles.title}>چرا اشتراک پلاس بخریم؟</div>
              <div
                className={styles.close_icon_container}
                aria-hidden="false"
                onClick={() => closeModal("plus-features")}
              >
                <svg className={styles.close_icon}>
                  <use href="#close"></use>
                </svg>
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
          <div className="flex-grow-1 d-flex flex-column b-white">
            <div className={styles.content}>
              <div className={styles.tabs_container}>
                <ul className="d-flex position-relative m-0">
                  {features?.map((feature) => (
                    <li
                      key={feature.type}
                      className={`${styles.feature} ${feature.type === activeFeature.type ? styles.active_feature : ""}`}
                      onClick={() => setActiveFeature(feature)}
                    >
                      {feature.title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.tab_content}>
                <div>
                  <div
                    className={styles.feature_img_container}
                    aria-hidden="true"
                    aria-label=""
                  >
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={activeFeature?.mobileIcon}
                      />
                      <source
                        type="image/jpeg"
                        srcSet={activeFeature?.mobileIcon}
                      />
                      <img
                        className={styles.feature_img}
                        src={activeFeature?.mobileIcon}
                        alt=""
                        title=""
                      />
                    </picture>
                  </div>
                  <div className={styles.feature_description}>
                    <div className={styles.feature_description_text}>
                      <div
                        dir="rtl"
                        dangerouslySetInnerHTML={{
                          __html: activeFeature.description || "",
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.feature_questions}>
                    <div className={styles.questions_content}>
                      <h3 className={styles.questions_title}>سوالات متداول</h3>
                      <PlusQuestions />
                    </div>
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

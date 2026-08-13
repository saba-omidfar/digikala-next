import React, { useState } from "react";

import styles from "./seo.module.css";

function Seo({ data, isLandingPage }) {
  const [isExtended, setIsExtended] = useState(false);

  return (
    <div
      className="d-flex justify-content-center position-relative overflow-hidden"
      style={{ backgroundColor: isLandingPage ? "rgb(239, 247, 251)" : "" }}
    >
      <div className={styles.container}>
        <div id={data?.widget_id} className={styles.content_container}>
          <article
            className={styles.content}
            style={{
              backgroundColor: isLandingPage ? "hsl(199,60%,96%)" : "#fff",
            }}
          >
            <div
              className={`${styles.seo_content} ${
                isExtended ? styles.no_before : ""
              }`}
              style={{ height: isExtended ? "auto" : "156px" }}
            >
              <div
                className={styles.seo_text}
                style={{
                  color: isLandingPage ? "hsl(199,50%,26%)" : "#3f4064",
                }}
                dir="rtl"
                dangerouslySetInnerHTML={{
                  __html: data?.data?.description || "",
                }}
              ></div>
            </div>
            <button
              className={styles.seo_see_more_btn}
              style={{ color: isLandingPage ? "hsl(199,80%,40%)" : "#ef4056" }}
              type="submit"
              onClick={() => setIsExtended((prevState) => !prevState)}
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                مشاهده {isExtended ? "کمتر" : "بیشتر"}
                <div className="d-flex" aria-hidden="false">
                  <svg
                    className={styles.seo_content_icon}
                    style={{
                      fill: isLandingPage ? "hsl(199,80%,40%)" : "#ef4056",
                    }}
                  >
                    <use
                      href={`${isExtended ? "#expandLess" : "#expandMore"}`}
                    ></use>
                  </svg>
                </div>
              </div>
            </button>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Seo;

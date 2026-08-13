import Image from "next/image";

import styles from "./scores.module.css";

function Scores({ width, height, isIcon = false, marginStyle, starSize }) {
  return (
    <div className="d-flex align-items-center">
      <div className={styles.empty_stars_container} style={marginStyle}>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            style={{
              width: `${starSize}px`,
              height: `${starSize}px`,
              lineHeight: "0",
            }}
          >
            {isIcon ? (
              <Image
                width={starSize}
                height={starSize}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  display: "inline-block",
                }}
                src="/images/svg/star-empty.svg"
                alt=""
              />
            ) : (
              <div className="d-flex">
                <div
                  className={`${styles.star_outline_icon} cube-font-icon`}
                  data-icon-name="cube-star"
                  data-icon="&#xE928;"
                  style={{
                    width: `${starSize}px`,
                    height: `${starSize}px`,
                    fontSize: `${starSize}px`,
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}

        <div
          className={styles.fill_stars_container}
          style={{ width: width, height: height }}
        >
          <div
            className="position-absolute d-flex flex-nowrap"
            style={{ right: 0, top: 0, columnGap: "2px" }}
          >
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                style={{
                  width: `${starSize}px`,
                  height: `${starSize}px`,
                  lineHeight: "0",
                }}
              >
                {isIcon ? (
                  <Image
                    width={starSize}
                    height={starSize}
                    src="/images/svg/star-fill.svg"
                    alt=""
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      display: "inline-block",
                    }}
                  />
                ) : (
                  <div className="d-flex">
                    <div
                      className={`${styles.star_fill_icon} cube-font-icon`}
                      data-icon-name="cube-star_fill"
                      data-icon="&#xE928;"
                      style={{
                        width: `${starSize}px`,
                        height: `${starSize}px`,
                        fontSize: `${starSize}px`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scores;

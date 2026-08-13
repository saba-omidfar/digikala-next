import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./description.module.css";

function Description({ data, systemColor, isLandingPage }) {
  const { isSmallScreen } = useScreenStatus();

  if (!data?.data) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <div
          id={data?.widget_id}
          className={styles.content}
          style={{
            backgroundColor: systemColor
              ? systemColor?.["--color-neutral-000"]
              : "",
          }}
        >
          <div className="d-flex align-items-center justify-content-center flex-column w-100">
            <div
              className={styles.title_text}
              style={{
                color: systemColor ? systemColor?.["--color-neutral-800"] : "",
              }}
            >
              {data?.data?.title}
            </div>
            <p className={styles.description_paragraph}></p>
            <div
              className={styles.description_text}
              style={{
                color: isLandingPage
                  ? isSmallScreen
                    ? "hsl(229,50%,24%)"
                    : "hsl(199,50%,26%)"
                  : "3f4064",
              }}
              dangerouslySetInnerHTML={{
                __html: data?.data?.description || "",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;

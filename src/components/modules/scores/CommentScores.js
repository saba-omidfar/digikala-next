import React from "react";

import styles from "./commentScores.module.css";

function CommentScores({ width }) {
  return (
    <div className="d-inline-flex flex-nowrap position-relative mt-1">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="d-flex">
          <div
            data-icon-name="cube-chevron-left"
            data-icon="&#xE928;"
            className={`${styles.comment_question_star_empty} cube-font-icon`}
          ></div>
        </div>
      ))}
      <div
        className={styles.comment_question_stars_container}
        style={{ width: width }}
      >
        <div className={styles.comment_question_stars}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="d-flex">
              <div
                data-icon-name="cube-chevron-left"
                data-icon="&#xE928;"
                className={`${styles.comment_question_star_fill} cube-font-icon`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentScores;

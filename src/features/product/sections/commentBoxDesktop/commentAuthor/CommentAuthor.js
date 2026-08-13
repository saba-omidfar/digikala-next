import Image from "next/image";
import { Tooltip } from "react-tooltip";

import styles from "./commentAuthor.module.css";

function CommentAuthor({ comment }) {
  const hasProfile =
    typeof comment?.social_profile === "object" &&
    !Array.isArray(comment?.social_profile);

  return (
    <div className="d-flex align-items-center">
      {hasProfile && (
        <div
          className={styles.user_profile_container}
          aria-hidden="true"
          aria-label=""
        >
          <div aria-hidden="true">
            <Image
              src={comment?.social_profile?.photo}
              width={40}
              height={40}
              alt=""
              className={styles.user_profile_img}
            />
          </div>
        </div>
      )}

      <div className={styles.comment_author_container}>
        <div className="d-flex align-items-center">
          <p className={styles.comment_author}>
            {comment?.user_name || "کاربر دیجی‌کالا"}
          </p>

          {comment?.review_user_type !== "user" ? (
            <>
              <div className="d-flex" aria-hidden={false}>
                <div
                  className={`${styles.comment_disable_icon} cube-font-icon`}
                  data-icon-name="cube-dot-outline"
                  data-icon="&#xEAF3;"
                ></div>
              </div>
              <div className={styles.comment_author_role_badge}>
                <p className={styles.comment_author_role}>
                  {comment?.review_user_type === "buyer" ? "خریدار" : "فروشنده"}
                </p>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        {comment?.contribution_badge && (
          <div
            data-tooltip-id="active-user"
            data-tooltip-content={comment?.contribution_badge?.tooltip_text}
            data-tooltip-place="bottom"
          >
            <div className={styles.author_is_active_container}>
              <div className={styles.animate_icon_container}>
                <dotlottie-player
                  autoplay
                  loop
                  src="/statics/lottie/contribution-badge.lottie"
                  background="transparent"
                />
              </div>
              <div className={styles.author_is_active_text}>
                {comment?.contribution_badge?.text}
              </div>
            </div>

            <Tooltip
              className="active_user_tooltip"
              id="favorite"
              place="left"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentAuthor;

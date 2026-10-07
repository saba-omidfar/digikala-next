import { useState, useRef } from "react";

import Link from "next/link";

import CommentPopover from "../commentPopover/CommentPopover";

import useScreenStatus from "@/hooks/useScreenStatus";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./commentItem.module.css";

export default function CommentItem({ comment, refetch }) {
  const anchorRef = useRef(null);
  const { isSmallScreen } = useScreenStatus();

  const [anchorOpen, setAnchorOpen] = useState(false);
  const status = comment?.status;

  const statusConfig = {
    approved: {
      badgeClass: styles.comment_approved_badge,
      iconClass: styles.approved_icon,
      title: "تایید شده",
    },

    pending: {
      badgeClass: styles.comment_pending_badge,
      iconClass: styles.pending_icon,
      title: "در انتظار بررسی",
    },

    rejected: {
      badgeClass: styles.comment_rejected_badge,
      iconClass: styles.reject_icon,
      title: "رد شده",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;

  const handleShowCommentPopover = () => {
    if (isSmallScreen) {
      openModal(<MobileCommentPopover commentId={comment?.id} />, {
        name: "comment-popover",
        className: "modal__comment_popover bottomSheet__content--border-lg",
      });
    } else {
      setAnchorOpen(true);
    }
  };

  return (
    <div className={styles.comment_container}>
      <div className="d-flex flex-column justify-content-between w-100">
        <div className={styles.comment_top_section}>
          <div>
            <Link
              className="d-flex align-items-start"
              href={comment?.product?.url?.uri || "#"}
            >
              <div
                className={styles.product_img_container}
                role="img"
                aria-hidden="false"
                aria-label={comment?.product?.title_fa}
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet={comment?.product?.images?.main?.url?.[0]}
                  />
                  <source
                    type="image/jpeg"
                    srcSet={comment?.product?.images?.main?.url?.[0]}
                  />
                  <img
                    className={styles.product_img}
                    alt={comment?.product?.title_fa}
                    title=""
                    src={comment?.product?.images?.main?.url?.[0]}
                  />
                </picture>
              </div>
              <p className={styles.product_title}>
                {comment?.product?.title_fa}
              </p>
            </Link>
          </div>
          <div className={styles.comment_btns_container}>
            <div
              onMouseEnter={() => setAnchorOpen(true)}
              onMouseLeave={() => setAnchorOpen(false)}
            >
              <div ref={anchorRef}>
                <div className={styles.comment_btn_more} aria-hidden="false">
                  <svg className={styles.more_icon}>
                    <use href="#moreVert"></use>
                  </svg>
                </div>
              </div>

              <CommentPopover
                open={anchorOpen}
                anchorRef={anchorRef}
                productId={comment?.product?.id}
                commentId={comment.id}
                commentBody={comment?.body}
                refetch={refetch}
                onClose={() => setAnchorOpen(false)}
              />
            </div>
            <div
              className={`${styles.comment_badge} ${currentStatus.badgeClass}`}
            >
              <div
                className={styles.comment_status_icon_container}
                aria-hidden="false"
              >
                <svg className={currentStatus.iconClass}>
                  <use href="#statusDeactive"></use>
                </svg>
              </div>

              <p className={styles.comment_status_title}>
                {currentStatus.title}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.comment_body_container}>
          <p className={styles.comment_body}>{comment?.body}</p>
        </div>
        <div className={styles.comment_relative_date_container}>
          {comment?.purchased_item ? (
            <div className="d-flex align-items-center">
              <Link
                className="d-flex align-items-center"
                href={`/seller/${comment?.purchased_item?.seller?.code}/`}
              >
                <div className="d-flex ms-2">
                  <div
                    className={`${styles.comment_seller_icon} cube-font-icon`}
                    data-icon-name="cube-value-seller"
                    data-icon="&#xE920;"
                  ></div>
                </div>
                <p className={styles.comment_seller_name}>
                  {comment?.purchased_item?.seller?.title}
                </p>
              </Link>

              {comment?.product?.has_true_to_size ? (
                <>
                  <div className="d-flex mx-1" aria-hidden="false">
                    <svg className={styles.dot_icon}>
                      <use href="#dotOutline"></use>
                    </svg>
                  </div>
                  <div className="d-flex ms-1" aria-hidden="false">
                    <svg className={styles.size_icon}>
                      <use href="#variationSize"></use>
                    </svg>
                  </div>{" "}
                  <p className={styles.comment_seller_size}>
                    {comment?.purchased_item?.size?.title}
                  </p>
                </>
              ) : (
                ""
              )}

              {comment?.product?.colors?.length ? (
                <>
                  <div className="d-flex mx-1" aria-hidden="false">
                    <svg className={styles.dot_icon}>
                      <use href="#dotOutline"></use>
                    </svg>
                  </div>
                  <div
                    className={styles.comment_purchased_item_color}
                    style={{
                      backgroundColor: comment?.purchased_item?.color?.hex_code,
                    }}
                  ></div>
                  <p className={styles.comment_purchased_item_color_name}>
                    {comment?.purchased_item?.color?.title}
                  </p>
                </>
              ) : (
                ""
              )}

              <div className="d-flex mx-1" aria-hidden="false">
                <svg className={styles.dot_icon}>
                  <use href="#dotOutline"></use>
                </svg>
              </div>
              <div className="d-flex align-items-center">
                <p className={styles.comment_relative_date}>
                  {comment?.relative_date}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}

          {comment?.reactions?.likes?.length !== 0 ||
          comment.reactions.dislikes?.length !== 0 ? (
            <div className={styles.comment_feedback_container}>
              <div className="d-flex align-items-center">
                <p className={styles.comment_feedback_text}>
                  {comment?.reactions?.likes?.length > 1
                    ? `این نظر برای ${toPersianDigits(comment?.reactions?.likes)} نفر مفید بود`
                    : toPersianDigits(comment?.reactions?.likes)}
                </p>
                <div
                  className={styles.comment_feedback_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.comment_feedback_icon}>
                    <use href="#thumbsUp"></use>
                  </svg>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <p className={styles.comment_feedback_text}>
                  {toPersianDigits(comment?.reactions?.dislikes)}
                </p>
                <div
                  className={styles.comment_feedback_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.comment_feedback_icon}>
                    <use href="#thumbsDown"></use>
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

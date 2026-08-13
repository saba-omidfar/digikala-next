import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import toPersianDigits from "@/utils/toPersianDigits";
import getTrueToSizeLabel from "@/utils/getTrueToSizeClass";
import shouldTruncate from "@/utils/shouldTruncate";
import useScreenStatus from "@/hooks/useScreenStatus";

import { useGetFeedback, usePostFeedback } from "@/hooks/useFeedback";
import useAlbumGroups from "@/features/shared/hooks/useGalleryGroups";

import Scores from "@/components/modules/scores/Scores";
import GalleryModal from "@/features/product/modals/galleryModal/GalleryModal";
import Loading from "@/components/modules/loading/Loading";
import CommentPopover from "./commentPopover/CommentPopover";
import CommentAuthor from "./commentAuthor/CommentAuthor";
import MobileCommentPopover from "@/features/product/modals/mobileCommentPopover/MobileCommentPopover";

import styles from "./commentBox.module.css";

function commentBox({ comment }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [anchorOpen, setAnchorOpen] = useState(false);

  const { openModal } = useModal();
  const { isSmallScreen } = useScreenStatus();
  const anchorRef = useRef(null);
  const { productDetails, mediaComments } = useProductContext();

  const { mutate: toggleFeedback, isLoading, variables } = usePostFeedback();
  const { data: feedback, refetch } = useGetFeedback({
    targetId: comment.id,
    targetType: "comment",
  });

  const groups = useAlbumGroups(productDetails, mediaComments);
  const totalMainItemsLength = useMemo(() => {
    return groups?.filter((g) => g.type === "MAIN").flatMap((g) => g.items)
      .length;
  }, [groups]);

  const togglefeedbacksHandler = ({ commentId, type }) => {
    toggleFeedback(
      {
        targetId: commentId,
        targetType: "comment",
        type,
      },
      {
        onSettled: () => {
          refetch();
        },
      },
    );
  };

  const handleShowCommentPopover = () => {
    if (isSmallScreen) {
      openModal(<MobileCommentPopover commentId={comment?.id} />, {
        name: "comment-popover",
        className: "modal__comment_popover bottomSheet__content--border-lg",
      });
    } else {
      setAnchorOpen((p) => !p);
    }
  };

  useEffect(() => {
    import("@ebcom/dotlottie-player");
  }, []);

  const limit = isSmallScreen ? 150 : 480;
  const body = comment?.body || "";
  const isLong = shouldTruncate(body, limit);

  return (
    <article className={styles.comment_container}>
      <div className="d-flex justify-content-between w-100">
        <div className="w-100">
          <div className="d-flex align-items-start w-100 mt-1">
            <div className={styles.comment_info_container}>
              <div>
                <div className={styles.comment_date_container}>
                  <CommentAuthor comment={comment} />
                  <div className="d-flex align-items-center position-relative">
                    <div className={styles.comment_date}>
                      {toPersianDigits(comment?.created_at)}
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        <button
                          ref={anchorRef}
                          id="pdp-comment-three-dots"
                          type="button"
                          onClick={handleShowCommentPopover}
                        >
                          <div className="d-flex" aria-hidden="false">
                            <svg className={styles.more_icon}>
                              <use href="#moreVert"></use>
                            </svg>
                          </div>
                        </button>

                        <CommentPopover
                          open={anchorOpen}
                          anchorRef={anchorRef}
                          commentId={comment.id}
                          onClose={() => setAnchorOpen(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center">
                  {comment?.rate !== 0 ? (
                    <Scores
                      width={`${(100 * comment?.rate) / 5}%`}
                      height={20}
                      isIcon={true}
                      starSize={20}
                    />
                  ) : (
                    ""
                  )}
                  {comment?.true_to_size_rate ? (
                    <div className="d-flex align-items-center">
                      <div className="d-flex" aria-hidden="false">
                        <div
                          className={`${styles.dot_icon} cube-font-icon`}
                          data-icon-name="cube-dot-outline"
                          data-icon="&#xEAF3;"
                        ></div>
                      </div>
                      <div className={styles.true_to_size_container}>
                        <div className="d-flex" aria-hidden="false">
                          <svg
                            className={`${styles.true_to_size_icon} ${getTrueToSizeLabel(comment.true_to_size_rate).colorIcon}`}
                          >
                            <use
                              href={`#${getTrueToSizeLabel(comment.true_to_size_rate).icon}`}
                            ></use>
                          </svg>
                        </div>
                        <p
                          className={`${styles.true_to_size_text} ${getTrueToSizeLabel(comment.true_to_size_rate).colorText}`}
                        >
                          {getTrueToSizeLabel(comment.true_to_size_rate).label}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {comment?.title && (
                  <p className={styles.comment_title}>{comment?.title}</p>
                )}
                <p className={styles.comment_body}>
                  {!isExpanded ? body.slice(0, limit) : body}
                  {!isExpanded && isLong ? "..." : ""}
                </p>
                {/* <p
                  className={`${styles.comment_body} ${!isSmallScreen && comment?.body?.length > 480 && !isExpanded ? "ellipsis ellipsis-4" : ""}`}
                >
                  {!isExpanded
                    ? `${comment?.body?.slice(0, isSmallScreen ? 150 : 480)} ...`
                    : comment?.body}
                </p> */}
                {!isExpanded &&
                comment?.body?.length > (isSmallScreen ? 150 : 480) ? (
                  <span
                    className={styles.see_more_btn}
                    onClick={() => setIsExpanded(true)}
                  >
                    <span>ادامه</span>
                    <div className="d-flex">
                      <div
                        data-icon-name="cube-nav-chevron-down"
                        data-icon="&#xE9C2;"
                        className={`${styles.chevron_left_icon} cube-font-icon`}
                      ></div>
                    </div>
                  </span>
                ) : (
                  ""
                )}
                {comment?.advantages?.map((advantage, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <div
                      className={styles.comment_advantage_icon_container}
                      aria-hidden="false"
                    >
                      <div
                        data-icon-name="cube-add-simple"
                        data-icon="&#xE93A;"
                        className={`${styles.comment_advantage_icon} cube-font-icon`}
                      ></div>
                    </div>
                    <p className={styles.comment_advantage_text}>{advantage}</p>
                  </div>
                ))}
                {comment?.disadvantages?.map((disadvantage, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <div
                      className={styles.comment_disadvantage_icon_container}
                      aria-hidden="false"
                    >
                      <div
                        data-icon-name="cube-remove-simple"
                        data-icon="&#xE91D;"
                        className={`${styles.comment_disadvantage_icon} cube-font-icon`}
                      ></div>
                    </div>
                    <p className={styles.comment_disadvantage_text}>
                      {disadvantage}
                    </p>
                  </div>
                ))}

                <div className="d-flex justify-content-start align-items-center flex-wrap">
                  {comment?.files?.length
                    ? comment.files.map((file, fileIndex) => {
                        // همه گروه‌های کامنتی
                        const commentGroups =
                          groups?.filter((g) => g.type === "COMMENTS") || [];

                        // پیدا کردن ایندکس گروه این کامنت
                        const groupIndex = commentGroups.findIndex(
                          (g) => g.commentId === comment.id,
                        );

                        // اگر پیدا نشد، ادامه نده
                        if (groupIndex === -1) return null;

                        // تعداد عکس‌های قبل از این کامنت
                        const allPreviousItems = commentGroups
                          .slice(0, groupIndex)
                          .reduce((acc, g) => acc + (g.items?.length || 0), 0);

                        // ایندکس نهایی
                        const slideIndex =
                          totalMainItemsLength + allPreviousItems + fileIndex;

                        return (
                          <div
                            key={fileIndex}
                            style={{
                              margin: "12px 0 12px 8px",
                              width: "50px",
                              height: "50px",
                              lineHeight: "0",
                            }}
                            onClick={() => {
                              openModal(
                                <GalleryModal
                                  selectedCommentId={comment.id}
                                  selectedSlideIndex={slideIndex}
                                />,
                                {
                                  name: "album",
                                  className: "modal__album",
                                  size: "full",
                                },
                              );
                            }}
                          >
                            <Image
                              className={styles.comment_img}
                              width={50}
                              height={50}
                              src={file?.thumbnail_url?.[0]}
                              alt=""
                            />
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 d-flex align-items-center flex-row mt-2">
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

            {/* Size */}
            {productDetails?.has_true_to_size ? (
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

            {productDetails?.colors?.length ? (
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
          </div>
        ) : (
          ""
        )}
        <div className={styles.comment_feedback_container}>
          <div className="d-flex align-items-center">
            <button
              className={styles.comment_feedback_btn}
              id="comment-like"
              onClick={() =>
                togglefeedbacksHandler({
                  commentId: comment?.id,
                  type: "like",
                })
              }
            >
              {isLoading && variables?.type === "like" ? (
                <Loading isSmall={true} />
              ) : (
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  {toPersianDigits(
                    (comment?.reactions?.likes || 0) +
                      (feedback?.userLiked ? 1 : 0),
                  )}
                  <div className="d-flex me-1">
                    <div
                      className={`${styles.comment_feedback_icon} cube-font-icon`}
                      data-icon-name="cube-value-like"
                      data-icon={feedback?.userLiked ? "\uEB38" : "\uE927"}
                    ></div>
                  </div>
                </div>
              )}
            </button>
            <button
              className={styles.comment_feedback_btn}
              id="comment-dislike"
              onClick={() =>
                togglefeedbacksHandler({
                  commentId: comment?.id,
                  type: "dislike",
                })
              }
            >
              {isLoading && variables?.type === "dislike" ? (
                <Loading isSmall={true} />
              ) : (
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  <p>
                    {toPersianDigits(
                      (comment?.reactions?.dislikes || 0) +
                        (feedback?.userDisliked ? 1 : 0),
                    )}
                  </p>
                  <div className="d-flex me-1">
                    <div
                      className={`${styles.comment_feedback_icon} cube-font-icon`}
                      data-icon-name="cube-value-dislike"
                      data-icon={feedback?.userDisliked ? "\uEB39" : "\uE926"}
                    ></div>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default commentBox;

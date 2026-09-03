import { useMemo } from "react";
import Link from "next/link";

import Scores from "@/components/modules/scores/Scores";
import Loading from "@/components/modules/loading/Loading";
import CommentAuthor from "@/features/product/sections/commentBoxDesktop/commentAuthor/CommentAuthor";
import GalleryModal from "../galleryModal/GalleryModal";
import MobileCommentPopover from "../mobileCommentPopover/MobileCommentPopover";

import useAlbumGroups from "@/features/shared/hooks/useGalleryGroups";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";

import toPersianDigits from "@/utils/toPersianDigits";
import getTrueToSizeLabel from "@/utils/getTrueToSizeClass";

import { useGetFeedback, usePostFeedback } from "@/hooks/useFeedback";

import styles from "./showCommentDetailsModal.module.css";

function ShowCommentDetailsModal({ comment }) {
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const { openModal, closeModal } = useModal();
  const { productDetails, mediaComments } = useProductContext();

  const groups = useAlbumGroups(productDetails, mediaComments);
  const totalMainItemsLength = useMemo(() => {
    return groups?.filter((g) => g.type === "MAIN").flatMap((g) => g.items)
      .length;
  }, [groups]);

  const { mutate: toggleFeedback, isLoading, variables } = usePostFeedback();
  const { data: feedback, refetch } = useGetFeedback({
    targetId: comment.id,
    targetType: "comment",
  });

  const togglefeedbacksHandler = ({ commentId, type }) => {
    if (!user) {
      showSnackbar("ابتدا وارد شوید.");
      return;
    }

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
    openModal(<MobileCommentPopover commentId={comment?.id} />, {
      name: "comment-popover",
      className: "modal__comment_popover bottomSheet__content--border-lg",
    });
  };

  const { commentGroupIndex, allPreviousItems } = useMemo(() => {
    const commentGroups = groups?.filter((g) => g.type === "COMMENTS") ?? [];

    const commentGroupIndex = commentGroups.findIndex(
      (g) => g.commentId === comment.id,
    );

    return {
      commentGroupIndex,
      allPreviousItems:
        commentGroupIndex === -1
          ? 0
          : commentGroups
              .slice(0, commentGroupIndex)
              .reduce((acc, g) => acc + (g.items?.length || 0), 0),
    };
  }, [groups, comment.id]);

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div
          className="d-flex align-items-center"
          style={{ borderBottom: "1px solid #e2e2e2", padding: "16px 0" }}
        >
          <div className="flex-grow-1">
            <CommentAuthor comment={comment} />
          </div>
          <div className="d-flex" onClick={() => closeModal()}>
            <div
              data-icon-name="cube-close"
              data-icon="&#xE907;"
              className={`${styles.modal_close_btn} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-grow-1 overflow-y-auto">
        <div className={styles.modal_content}>
          <article className="flex-grow-1">
            <div className="w-100 d-flex justify-content-between">
              <div className="w-100">
                <div className="d-flex align-items-start w-100 mt-1">
                  <div className="flex-grow-1">
                    <div className={styles.comment_body_container}>
                      <div className="d-flex align-items-center">
                        <Scores
                          starSize={20}
                          isIcon={true}
                          width={`${(100 * comment?.rate) / 5}%`}
                        />
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
                                {
                                  getTrueToSizeLabel(comment.true_to_size_rate)
                                    .label
                                }
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
                      <p className={styles.comment_body}>{comment?.body}</p>

                      {comment?.advantages?.label
                        ? comment?.advantages?.map((advantage) => (
                            <div className="d-flex align-items-center">
                              <div className="d-flex ms-2" aria-hidden="false">
                                <svg className={styles.comment_advantage_icon}>
                                  <use href="#addSimple"></use>
                                </svg>
                              </div>
                              <p className={styles.comment_advantage_text}>
                                {advantage}
                              </p>
                            </div>
                          ))
                        : ""}

                      {comment?.disadvantages?.length
                        ? comment?.disadvantages?.map((disadvantage) => (
                            <div className="d-flex align-items-center">
                              <div className="d-flex ms-2" aria-hidden="false">
                                <svg
                                  className={styles.comment_disadvantage_icon}
                                >
                                  <use href="#removeSimple"></use>
                                </svg>
                              </div>
                              <p className={styles.comment_advantage_text}>
                                {disadvantage}
                              </p>
                            </div>
                          ))
                        : ""}

                      {comment?.files?.length ? (
                        <div className="d-flex justify-content-start align-items-center flex-wrap">
                          {comment?.files?.length &&
                            commentGroupIndex !== -1 &&
                            comment?.files?.map((file, fileIndex) => {
                              const slideIndex =
                                totalMainItemsLength +
                                allPreviousItems +
                                fileIndex;

                              return (
                                <div
                                  key={fileIndex}
                                  className={styles.comment_file_container}
                                  aria-hidden="false"
                                  aria-label={comment?.title}
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
                                  <picture>
                                    <source
                                      type="image/webp"
                                      srcSet={file?.thumbnail_url?.[0]}
                                    />
                                    <source
                                      type="image/jpeg"
                                      srcSet={file?.thumbnail_url?.[0]}
                                    />
                                    <img
                                      className={styles.comment_file}
                                      src={file?.thumbnail_url?.[0]}
                                      alt={comment?.title}
                                      title=""
                                    />
                                  </picture>
                                </div>
                              );
                            })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <div className="d-flex align-items-center">
                  <div>
                    <button
                      data-cro-id="pdp-comment-three-dots"
                      type="button"
                      onClick={handleShowCommentPopover}
                    >
                      <div className="d-flex" aria-hidden="false">
                        <svg className={styles.more_icon}>
                          <use href="#moreVert"></use>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex align-items-end flex-row mt-2">
              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center mt-2 mb-3">
                  <Link
                    className="d-flex align-items-center ms-2"
                    href={
                      comment?.purchased_item
                        ? comment?.purchased_item?.seller?.url
                        : "#"
                    }
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
                  <div
                    className={styles.dot_icon_container}
                    aria-hidden="false"
                  >
                    <svg className={styles.dot_icon}>
                      <use href="#dotOutline"></use>
                    </svg>
                  </div>
                  {comment?.purchased_item?.size ? (
                    <>
                      <div
                        className={styles.size_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.size_icon}>
                          <use href="#variationSize"></use>
                        </svg>
                      </div>
                      <p className={styles.size_text}>
                        {comment?.purchased_item?.size?.title}
                      </p>
                    </>
                  ) : (
                    ""
                  )}

                  <div
                    className={styles.purchased_item__color}
                    style={{
                      backgroundColor: comment?.purchased_item?.color?.hex_code,
                    }}
                  ></div>
                  <p className={styles.purchased_item__text}>
                    {comment?.purchased_item?.color?.title}
                  </p>
                </div>
                <div className={styles.comment_date}>
                  {toPersianDigits(comment?.created_at)}
                </div>
              </div>
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
                        <p className={styles.comment_feedback_count}>
                          {toPersianDigits(
                            (comment?.reactions?.likes || 0) +
                              (feedback?.userLiked ? 1 : 0),
                          )}
                        </p>
                        <div className="d-flex me-1">
                          <div
                            className={`${styles.comment_feedback_icon} cube-font-icon`}
                            data-icon-name="cube-value-like"
                            data-icon={
                              feedback?.userLiked ? "\uEB38" : "\uE927"
                            }
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
                        <p className={styles.comment_feedback_count}>
                          {toPersianDigits(
                            (comment?.reactions?.dislikes || 0) +
                              (feedback?.userDisliked ? 1 : 0),
                          )}
                        </p>
                        <div className="d-flex me-1">
                          <div
                            className={`${styles.comment_feedback_icon} cube-font-icon`}
                            data-icon-name="cube-value-dislike"
                            data-icon={
                              feedback?.userDisliked ? "\uEB39" : "\uE926"
                            }
                          ></div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default ShowCommentDetailsModal;

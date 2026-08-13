import React, { useEffect, useRef, useMemo } from "react";

import InfiniteScroll from "react-infinite-scroller";

import Scores from "@/components/modules/scores/Scores";
import CommentBox from "@/features/product/sections/commentBoxDesktop/CommentBox";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";
import SortCommentsQuestionsModal from "@/features/product/modals/sortCommentsQuestionsModal/SortCommentsQuestionsModal";
import AddCommentModal from "@/features/product/modals/addCommentModal/AddCommentModal";
import GalleryModal from "@/features/product/modals/galleryModal/GalleryModal";
import Loading from "@/components/modules/loading/Loading";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import toPersianDigits from "@/utils/toPersianDigits";

import useAlbumGroups from "@/features/shared/hooks/useGalleryGroups";

import styles from "./showAllCommentsModal.module.css";

export default function ShowAllCommentsModal() {
  const loadingRef = useRef(false);

  const {
    commentsData,
    productDetails,
    mediaComments,
    activeIntent,
    setActiveIntent,
    comments,
    isLoadingComments,
    setIsInfiniteComments,
    currentPage,
    setCurrentPage,
  } = useProductContext();

  const groups = useAlbumGroups(productDetails, mediaComments);
  const totalMainItemsLength = useMemo(() => {
    return groups?.filter((g) => g.type === "MAIN").flatMap((g) => g.items)
      .length;
  }, [groups]);

  const activeIntentData =
    activeIntent &&
    commentsData?.intent_data?.find((item) => item?.intentId === activeIntent);

  const { openModal, closeModal } = useModal();
  const mediaItems =
    commentsData?.media_comments?.length === 1
      ? commentsData?.media_comments?.[0]?.files?.map((file) => ({
          ...file,
          commentId: commentsData?.media_comments[0].id,
        }))
      : commentsData?.media_comments?.slice(0, 6);

  const loadMore = () => {
    console.log(
      "loadMore",
      currentPage,
      "loading:",
      isLoadingComments,
      "comments:",
      comments.length,
    );

    if (loadingRef.current) return;

    if (currentPage >= (commentsData?.pager?.total_pages ?? 1)) return;

    loadingRef.current = true;
    setCurrentPage((p) => p + 1);
  };

  useEffect(() => {
    loadingRef.current = isLoadingComments;
  }, [isLoadingComments]);

  useEffect(() => {
    setIsInfiniteComments(true);

    return () => setIsInfiniteComments(false);
  }, []);

  const getPercentageColor = (percentage = 0) =>
    percentage === 0
      ? styles.hint_text_neutral
      : percentage >= 50
        ? styles.hint_text_success
        : styles.hint_text_caution;

  const getPercentageBgColor = (percentage = 0) =>
    percentage === 0
      ? styles.hint_bg_neutral
      : percentage >= 50
        ? styles.hint_bg_success
        : styles.hint_bg_caution;

  const handleSortModal = () => {
    openModal(<SortCommentsQuestionsModal />, {
      name: "sort-comments-questions",
      className: "bottomSheet__content--border-lg",
    });
  };

  return (
    <div className="flex-grow-1">
      <div className={styles.modal_layout}>
        <div className={styles.modal_header_container}>
          <div className={styles.modal_header}>
            <div className="flex-grow-1">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="text-break">
                  <div className="d-flex flex-grow-1 align-items-center">
                    <div
                      className={styles.arrow_icon_container}
                      onClick={() => closeModal()}
                      aria-hidden="false"
                    >
                      <svg className={styles.arrow_icon}>
                        <use href="#arrowRight"></use>
                      </svg>
                    </div>
                    <p className={styles.modal_title}>
                      <span className="position-relative">
                        {productDetails?.comments_count?.toLocaleString(
                          "fa-IR",
                        )}{" "}
                        دیدگاه
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  onClick={handleSortModal}
                  className="d-flex flex-row align-items-center"
                >
                  <div className={styles.sort_icon_btn}>
                    <div className="d-flex align-items-center flex-grow-1">
                      <div
                        className={styles.sort_icon_container}
                        data-cro-id="comment-sort-icon"
                        aria-hidden="false"
                      >
                        <svg className={styles.comment_sort_icon}>
                          <use href="#sort"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column overflow-y-auto flex-grow-1">
          <div className={styles.content}>
            <div className={styles.content_header_container}>
              <div className={styles.content_header}>
                <div
                  className="d-flex align-items-center"
                  style={{ height: "24px" }}
                >
                  <p className={styles.product_rating}>
                    {toPersianDigits(
                      Math.round(
                        (productDetails?.rating?.rate / 100) * 5 * 10,
                      ) / 10,
                    )}
                  </p>
                  <p className={styles.product_max_rating}> از ۵ </p>
                </div>
                <div className="d-flex align-items-center">
                  <Scores
                    width={Math.floor(productDetails?.rating?.rate)}
                    height={20}
                    isIcon={false}
                    marginStyle={{ marginTop: "4px" }}
                    starSize={20}
                  />
                  <p className={styles.product_all_rating}>
                    {`از مجموع ${productDetails?.rating?.count?.toLocaleString(
                      "fa-IR",
                    )} امتیاز`}
                  </p>
                </div>
              </div>
              <div className={styles.pics_comment_container}>
                {commentsData?.media_comments?.length &&
                  mediaItems?.map((commentItem, index) => {
                    const slideIndex =
                      totalMainItemsLength +
                      (commentsData?.media_comments?.length === 1
                        ? index
                        : commentsData?.media_comments
                            ?.slice(0, index)
                            ?.reduce(
                              (acc, g) => acc + (g.files?.length || 0),
                              0,
                            ));

                    return (
                      <div
                        id="pics-in-comment"
                        key={index}
                        className={styles.media_slide_item}
                        onClick={() => {
                          openModal(
                            <GalleryModal
                              customClass="modal_content_album_modal"
                              selectedSlideIndex={slideIndex}
                              selectedCommentId={
                                commentItem.commentId || commentItem.id
                              }
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
                            srcSet={
                              commentItem?.thumbnail_url?.[0] ||
                              commentItem?.files?.[0]?.thumbnail_url?.[0]
                            }
                          />
                          <source
                            type="image/jpeg"
                            srcSet={
                              commentItem?.thumbnail_url?.[0] ||
                              commentItem?.files?.[0]?.thumbnail_url?.[0]
                            }
                          />
                          <img
                            className={styles.media_slide_item_img}
                            src={
                              commentItem?.thumbnail_url?.[0] ||
                              commentItem?.files?.[0]?.thumbnail_url?.[0]
                            }
                            width={84}
                            height={84}
                            alt=""
                            title=""
                          />
                        </picture>
                      </div>
                    );
                  })}
              </div>
            </div>
            {commentsData?.intent_data?.length ? (
              <div className={styles.intent_container}>
                <div className={styles.intent_title_container}>
                  <div className="d-flex align-items-center flex-grow-1">
                    <p className={styles.intent_title}>
                      <span className="position-relative">
                        فیلتر بر اساس موضوع
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="d-flex overflow-x-auto overflow-y-hidden hide-scrollbar gap-1">
                    {commentsData?.intent_data?.map((intent, index) => (
                      <div
                        key={index}
                        className={styles.intent_badge_container}
                        onClick={() => setActiveIntent(intent?.intentId)}
                      >
                        <div
                          className={`${styles.intent_badge} ${
                            activeIntent === intent?.intentId
                              ? styles.intent_badge_active
                              : ""
                          }`}
                          id="comment-intent"
                        >
                          <span>{intent?.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {activeIntentData && (
                  <div className={styles.intent_tags_container}>
                    <div className={styles.intent_tags}>
                      <div
                        className={`${
                          styles.sentiment_percentages
                        } ${getPercentageColor(
                          activeIntentData?.tag_percentage?.positive,
                        )}`}
                      >
                        {toPersianDigits(
                          activeIntentData?.tag_percentage?.positive,
                        )}
                        %
                        <div
                          className={`${
                            styles.sentiment_percentages_text
                          } ${getPercentageColor(
                            activeIntentData?.tag_percentage?.positive,
                          )}`}
                        >
                          مثبت
                        </div>
                      </div>
                      <div className={styles.inetnt_progressbar_container}>
                        <div
                          className={`${
                            styles.inetnt_progressbar
                          } ${getPercentageBgColor(
                            activeIntentData?.tag_percentage?.positive,
                          )}`}
                          style={{
                            width: `${activeIntentData?.tag_percentage?.positive}%`,
                          }}
                        ></div>
                      </div>
                      <div className={styles.intent_comments_number}>
                        {toPersianDigits(activeIntentData?.tag_data?.negative)}{" "}
                        دیدگاه
                      </div>
                    </div>
                    <div className={styles.intent_tags}>
                      <div
                        className={`${
                          styles.sentiment_percentages
                        } ${getPercentageColor(
                          activeIntentData?.tag_percentage?.neutral,
                        )}`}
                      >
                        {toPersianDigits(
                          activeIntentData?.tag_percentage?.neutral,
                        )}
                        %
                        <div
                          className={`${
                            styles.sentiment_percentages_text
                          } ${getPercentageColor(
                            activeIntentData?.tag_percentage?.neutral,
                          )}`}
                        >
                          بی‌طرف
                        </div>
                      </div>
                      <div className={styles.inetnt_progressbar_container}>
                        <div
                          className={`${
                            styles.inetnt_progressbar
                          } ${getPercentageBgColor(
                            activeIntentData?.tag_percentage?.neutral,
                          )}`}
                          style={{
                            width: `${activeIntentData?.tag_percentage?.neutral}%`,
                          }}
                        ></div>
                      </div>
                      <div className={styles.intent_comments_number}>
                        {toPersianDigits(activeIntentData?.tag_data?.neutral)}{" "}
                        دیدگاه
                      </div>
                    </div>
                    <div className={styles.intent_tags}>
                      <div
                        className={`${
                          styles.sentiment_percentages
                        } ${getPercentageColor(
                          activeIntentData?.tag_percentage?.negative,
                        )}`}
                      >
                        {toPersianDigits(
                          activeIntentData?.tag_percentage?.negative,
                        )}
                        %
                        <div
                          className={`${
                            styles.sentiment_percentages_text
                          } ${getPercentageColor(
                            activeIntentData?.tag_percentage?.negative,
                          )}`}
                        >
                          منفی
                        </div>
                      </div>
                      <div className={styles.inetnt_progressbar_container}>
                        <div
                          className={`${
                            styles.inetnt_progressbar
                          } ${getPercentageBgColor(
                            activeIntentData?.tag_percentage?.negative,
                          )}`}
                          style={{
                            width: `${activeIntentData?.tag_percentage?.negative}%`,
                          }}
                        ></div>
                      </div>
                      <div className={styles.intent_comments_number}>
                        {toPersianDigits(activeIntentData?.tag_data?.negative)}{" "}
                        دیدگاه
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="d-flex h-100 flex-column">
              <div>
                <div className={styles.infiniteScroll_container}>
                  <InfiniteScroll
                    className="d-flex flex-wrap"
                    pageStart={1}
                    loadMore={loadMore}
                    hasMore={
                      currentPage < (commentsData?.pager?.total_pages ?? 1)
                    }
                    useWindow={false}
                    getScrollParent={() =>
                      document.querySelector(".infiniteScroll_container")
                    }
                  >
                    {comments?.map((comment, index) => (
                      <div
                        key={index}
                        className="overflow-x-hidden w-100 border-complete-b-200"
                        style={{
                          width: "calc(100% + 0px)",
                          marginBottom: "0",
                        }}
                      >
                        <div className={styles.comment_row_box_container}>
                          <CommentBox comment={comment} />
                        </div>
                      </div>
                    ))}

                    {isLoadingComments && (
                      <div className={styles.loading_container}>
                        <Loading isSmall />
                      </div>
                    )}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
            <div
              className={styles.add_comment_btn_container}
              onClick={() =>
                openModal(<AddCommentModal />, { name: "add-comment" })
              }
            >
              <button className={styles.add_comment_btn} id="su-comment">
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  <span>ثبت دیدگاه</span>
                  <div className="d-flex me-2">
                    <div
                      data-icon-name="cube-value-comment"
                      data-icon="&#xE90B;"
                      className={`${styles.add_comment_icon} cube-font-icon`}
                    ></div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

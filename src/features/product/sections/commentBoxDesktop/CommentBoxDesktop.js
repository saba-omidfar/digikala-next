"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import toPersianDigits from "@/utils/toPersianDigits";
import useAlbumGroups from "@/features/shared/hooks/useGalleryGroups";

import AIBuyerReviewsSummary from "@/features/product/sections/productContent/AIBuyerReviewsSummary";
import CommentBox from "@/features/product/sections/commentBoxDesktop/CommentBox";
import Pagination from "@/features/product/sections/pagination/Pagination";
import GalleryModal from "@/features/product/modals/galleryModal/GalleryModal";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import styles from "./commentBoxDesktop.module.css";

function CommentBoxDesktop() {
  const commentsWrapperRef = useRef(null);

  const { openModal, closeModal } = useModal();
  const {
    commentsData,
    currentPage,
    setCurrentPage,
    activeCommentsSort,
    setActiveCommentsSort,
    activeIntent,
    setActiveIntent,
    isLoading,
    productDetails,
    mediaComments,
  } = useProductContext();

  const [isExpendedComments, setIsExpendedComments] = useState(false);
  const [paginatedComments, setPaginatedComments] = useState([]);

  const activeIntentData =
    activeIntent &&
    commentsData?.intent_data?.find((item) => item?.intentId === activeIntent);

  const groups = useAlbumGroups(productDetails, mediaComments);
  const totalMainItemsLength = useMemo(() => {
    return groups?.filter((g) => g.type === "MAIN").flatMap((g) => g.items)
      .length;
  }, [groups]);

  useEffect(() => {
    setPaginatedComments(commentsData?.comments);
  }, [commentsData?.comments]);

  useEffect(() => {
    if (isLoading && commentsWrapperRef.current) {
      commentsWrapperRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isLoading]);

  const getPercentageColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return styles.hint_text_success;

      case "neutral":
        return styles.hint_text_neutral;

      case "negative":
        return styles.hint_text_caution;

      default:
        return "";
    }
  };

  const getPercentageBgColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return styles.hint_bg_success;

      case "neutral":
        return styles.hint_bg_neutral;

      case "negative":
        return styles.hint_bg_caution;

      default:
        return "";
    }
  };

  const mediaItems =
    commentsData?.media_comments?.length === 1
      ? commentsData?.media_comments?.[0]?.files?.map((file) => ({
          ...file,
          commentId: commentsData.media_comments[0].id,
        }))
      : commentsData?.media_comments?.slice(0, 6);

  useEffect(() => {
    if (isLoading) {
      openModal(<LoadingModal />, {
        name: "loading",
        className: "modal__loading rounded-medium",
      });
    } else {
      closeModal("loading");
    }
  }, [isLoading]);

  return (
    <div ref={commentsWrapperRef} className={styles.comments_wrapper}>
      {commentsData?.media_comments?.length ? (
        <div>
          <div className={styles.comment_pics_wrapper}>
            <div>
              <Swiper
                slidesPerView="auto"
                centeredSlides={false}
                draggable={true}
              >
                {mediaItems?.map((commentItem, index) => {
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
                    <SwiperSlide
                      key={index}
                      className={styles.comment_pic_slide}
                      onClick={() => {
                        openModal(
                          <GalleryModal
                            customClass="modal_content_album_modal"
                            selectedSlideIndex={slideIndex}
                            selectedCommentId={
                              commentItem.commentId || commentItem.id
                            }
                          />,
                          { name: "album", size: "full" },
                        );
                      }}
                    >
                      <div
                        id="pics-in-comment"
                        className={styles.comment_pic_container}
                      >
                        <Image
                          className={styles.comment_pic}
                          width={57}
                          height={57}
                          src={
                            commentItem?.thumbnail_url?.[0] ||
                            commentItem?.files?.[0]?.thumbnail_url?.[0]
                          }
                          alt=""
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <span
              id="customer-pics-down"
              onClick={() =>
                openModal(
                  <GalleryModal
                    showDetails={true}
                    customClass="modal_content_album_modal"
                    selectedSlideIndex={0}
                  />,
                  { name: "album", size: "full" },
                )
              }
            >
              <span className={styles.comment_pic_see_more_btn}>
                <span>مشاهده همه</span>
                <div className="d-flex">
                  <div
                    data-icon-name="cube-nav-chevron-left"
                    data-icon="&#xE9C2;"
                    className={`${styles.comment_pic_see_more_icon} cube-font-icon`}
                  ></div>
                </div>
              </span>
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      <AIBuyerReviewsSummary />
      {commentsData?.comments?.length ? (
        <>
          <div className={styles.comment_section}>
            <div className={styles.comment_section_title}>
              <div className="d-flex align-items-center flex-grow-1">
                <div className={styles.header_sort_icon_container}>
                  <svg className={styles.header_sort_icon}>
                    <use href="#sort"></use>
                  </svg>
                </div>
                <p className={styles.header_sort_title}>
                  <span className="position-relative">مرتب سازی:</span>
                </p>
              </div>
            </div>
            <div className={styles.header_sort_list}>
              {commentsData?.sort_options?.map((sortOption) => (
                <span
                  key={sortOption.id}
                  className={`${styles.header_sort_item} ${
                    activeCommentsSort === sortOption?.id
                      ? styles.header_sort_item_active
                      : ""
                  }`}
                  id="comment-sort"
                  onClick={() => setActiveCommentsSort(sortOption?.id)}
                >
                  {sortOption?.title}
                </span>
              ))}
            </div>
            <div className="me-auto d-block">
              <span className={styles.comments_count}>
                {toPersianDigits(commentsData?.pager?.total_items)} دیدگاه
              </span>
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
                <Swiper
                  slidesPerView="auto"
                  spaceBetween={8}
                  loopAdditionalSlides={2}
                  lazyPreloadPrevNext={1}
                  freeMode={true}
                >
                  {commentsData?.intent_data?.map((intent, index) => (
                    <SwiperSlide
                      key={index}
                      className={styles.intent_badge_container}
                      onClick={() => {
                        setActiveIntent(intent?.intentId);
                      }}
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
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className={styles.intent_tags_container}>
                {activeIntentData && (
                  <>
                    {/* Positive */}
                    <div className={styles.intent_tags}>
                      <div
                        className={`${styles.sentiment_percentages} ${getPercentageColor(
                          "positive",
                        )}`}
                      >
                        {toPersianDigits(
                          activeIntentData?.tag_percentage?.positive,
                        )}
                        %
                        <div
                          className={`${styles.sentiment_percentages_text} ${getPercentageColor(
                            "positive",
                          )}`}
                        >
                          مثبت
                        </div>
                      </div>

                      <div className={styles.inetnt_progressbar_container}>
                        <div
                          className={`${
                            styles.inetnt_progressbar
                          } ${getPercentageBgColor("positive")}`}
                          style={{
                            width: `${activeIntentData?.tag_percentage?.positive}%`,
                          }}
                        ></div>
                      </div>
                      <div className={styles.intent_comments_number}>
                        {toPersianDigits(activeIntentData?.tag_data?.positive)}{" "}
                        دیدگاه
                      </div>
                    </div>

                    {/* Neutral */}
                    <div className={styles.intent_tags}>
                      <div
                        className={`${styles.sentiment_percentages} ${getPercentageColor(
                          "neutral",
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
                          } ${getPercentageBgColor("neutral")}`}
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

                    {/* Negative */}
                    <div className={styles.intent_tags}>
                      <div
                        className={`${styles.sentiment_percentages} ${getPercentageColor(
                          "negative",
                        )}`}
                      >
                        {toPersianDigits(
                          activeIntentData?.tag_percentage?.negative,
                        )}
                        %
                        <div
                          className={`${styles.sentiment_percentages_text} ${getPercentageColor(
                            "negative",
                          )}`}
                        >
                          منفی
                        </div>
                      </div>

                      <div className={styles.inetnt_progressbar_container}>
                        <div
                          className={`${styles.inetnt_progressbar} ${getPercentageBgColor(
                            "negative",
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
                  </>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          <div>
            {(isExpendedComments
              ? paginatedComments
              : paginatedComments?.slice(0, 4)
            )?.map((comment) => (
              <CommentBox key={comment?.id} comment={comment} isIcon={true} />
            ))}

            {!isExpendedComments && commentsData?.pager?.total_items > 5 && (
              <div
                className={styles.more_comment_btn_container}
                onClick={() => setIsExpendedComments(true)}
              >
                <button className={styles.more_comment_btn}>
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    <p style={{ color: "#1672dd" }}>
                      {toPersianDigits(commentsData?.pager?.total_items - 4)}{" "}
                      دیدگاه دیگر
                    </p>
                    <div className="d-flex me-1" aria-hidden="false">
                      <svg className={styles.more_comment_icon_expend}>
                        <use href="#expandMore"></use>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {isExpendedComments && (
              <Pagination
                totalItems={commentsData?.pager?.total_items}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </>
      ) : (
        <div className={styles.no_comment_container}>
          <p className={styles.no_comment_text}>
            شما هم می‌توانید در مورد این کالا نظر دهید.
          </p>
          <p className={styles.no_comment_subText}>
            اگر این محصول را قبلا از دیجیکالا خریده باشید، دیدگاه شما به عنوان
            خریدار ثبت خواهد شد. همچنین در صورت تمایل می‌توانید به صورت ناشناس
            نیز دیدگاه خود را ثبت کنید
          </p>
        </div>
      )}
    </div>
  );
}

export default CommentBoxDesktop;

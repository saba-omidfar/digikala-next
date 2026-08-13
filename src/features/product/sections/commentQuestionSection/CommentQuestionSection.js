"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";

import InfoSection from "../infoSection/InfoSection";
import CommentBoxMobile from "../commentBoxMobile/CommentBoxMobile";
import ShowAllCommentsModal from "@/features/product/modals/showAllCommentsModal/ShowAllCommentsModal";
import AddCommentModal from "@/features/product/modals/addCommentModal/AddCommentModal";
import QuestionSection from "./QuestionSection";
import AiCommentBoxMobile from "../commentBoxMobile/AiCommentBoxMobile";
import GalleryModal from "@/features/product/modals/galleryModal/GalleryModal";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import useGalleryGroups from "@/features/shared/hooks/useGalleryGroups";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./commentQuestionSection.module.css";

export default function CommentQuestionSection() {
  const { openModal } = useModal();
  const { productDetails, mediaComments, commentsData } = useProductContext();

  const groups = useGalleryGroups(productDetails, mediaComments);
  const commentGroups = useMemo(() => {
    return groups?.filter((g) => g.type === "COMMENTS") ?? [];
  }, [groups]);

  const totalMainItemsLength = useMemo(() => {
    return groups?.filter((g) => g.type === "MAIN").flatMap((g) => g.items)
      .length;
  }, [groups]);

  const mediaItems =
    commentsData?.media_comments?.length === 1
      ? commentsData?.media_comments?.[0]?.files?.map((file) => ({
          ...file,
          commentId: commentsData.media_comments[0].id,
        }))
      : commentsData?.media_comments?.slice(0, 6);

  useEffect(() => {
    import("@ebcom/dotlottie-player");
  }, []);

  return (
    <section id="COMMENTS">
      <section className="position-relative overflow-hidden">
        <InfoSection
          id="comment"
          title="دیدگاه کاربرها"
          btnTitle={
            commentsData?.comments?.length
              ? `مشاهده ${toPersianDigits(
                  productDetails?.comments_count,
                )} دیدگاه`
              : ""
          }
          openModal={() =>
            openModal(<ShowAllCommentsModal isIcon="false" />, {
              name: "show-all-comments",
              className: "modal__reviews",
            })
          }
        >
          {commentsData?.comments?.length ? (
            <>
              <div className="d-flex align-items-center justify-content-start w-100">
                <span className={styles.comments_score}>
                  {toPersianDigits(
                    Math.round((productDetails?.rating?.rate / 100) * 5 * 10) /
                      10,
                  )}
                </span>
                <div className="d-flex align-items-center justify-content-center">
                  <Image
                    width={20}
                    height={20}
                    src="/images/svg/star-fill.svg"
                    alt=""
                  />
                </div>
                <span className={styles.comments_score_text}>
                  {`(بر اساس نظر ${productDetails?.rating?.count?.toLocaleString(
                    "fa-IR",
                  )} خریدار)`}
                </span>
              </div>
              <div className={styles.comment_pics_wrapper}>
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
                        key={index}
                        className={styles.media_slide_item_container}
                      >
                        <div
                          id="pics-in-comment"
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
                          <Image
                            className={styles.media_slide_item_img}
                            width={84}
                            height={84}
                            src={
                              commentItem?.thumbnail_url?.[0] ||
                              commentItem?.files?.[0]?.thumbnail_url?.[0]
                            }
                            alt=""
                          />
                        </div>
                        {commentGroups?.length > 7 &&
                        index === commentGroups.slice(0, 6)?.length - 1 ? (
                          <>
                            <div className={styles.media_slide_overlay}></div>
                            <span className={styles.media_slide_overlay_text}>
                              {toPersianDigits(commentGroups?.length - 6)}+
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <div id="add-comment" className="w-100">
                <div
                  className="px-3"
                  style={{ borderTop: "1px solid #f0f0f1" }}
                >
                  <div
                    className="d-flex justify-content-start"
                    style={{ marginTop: "16px" }}
                  >
                    <span className={styles.add_comment_icon_btn}>
                      <div className={styles.add_comment_icon}>
                        <dotlottie-player
                          autoplay
                          loop
                          mode="normal"
                          src="/statics/lottie/cup.lottie"
                          background="transparent"
                        ></dotlottie-player>
                      </div>
                    </span>
                    <div
                      className="d-flex flex-grow-1 align-items-start"
                      style={{ paddingBottom: "8px" }}
                      onClick={() =>
                        openModal(<AddCommentModal />, {
                          name: "add-comment",
                          className: "modal__add_comment rounded-medium",
                        })
                      }
                    >
                      <div>
                        <p className={styles.add_comment_title}>
                          اولین نفر دیدگاهتان را درباره این کالا بنویسید
                        </p>
                        {/* <p className={styles.add_comment_text}>
                          با ثبت دیدگاه بر روی کالاهای خریداری شده ۵ امتیاز در
                          دیجی‌کلاب دریافت کنید
                        </p> */}
                      </div>
                      <div
                        className={styles.add_comment_chevron_icon_container}
                      >
                        <div
                          data-icon-name="cube-nav-chevron-left"
                          data-icon="&#xE9C2;"
                          className={`${styles.add_comment_chevron_icon} cube-font-icon`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </InfoSection>

        {commentsData?.comments?.length ? (
          <>
            <div className={styles.comments_wrapper}>
              <AiCommentBoxMobile />
              {commentsData?.comments?.slice(0, 5).map((comment) => (
                <CommentBoxMobile key={comment.id} comment={comment} />
              ))}
              {commentsData?.comments?.length > 6 && (
                <div
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ padding: "0 40px" }}
                  onClick={() =>
                    openModal(<ShowAllCommentsModal />, {
                      name: "show-all-comments",
                      className: "modal__reviews",
                    })
                  }
                >
                  <button className={styles.see_more_commnt_btn}>
                    <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                      <div className="d-flex" aria-hidden="false">
                        <svg className={styles.modal_arrow_icon}>
                          <use href="#arrowLeft"></use>
                        </svg>
                      </div>
                    </div>
                  </button>
                  <span className={styles.see_more_commnt_text}>
                    مشاهده همه
                  </span>
                </div>
              )}
            </div>
            <div
              className={styles.add_comment_wrapper}
              onClick={() =>
                openModal(<AddCommentModal />, {
                  name: "add-comment",
                  className: "modal__add_comment rounded-medium",
                })
              }
            >
              <div className="d-flex align-items-start mt-3">
                <span className={styles.add_comment_icon_container}>
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.add_comment_icon}>
                      <use href="#comment"></use>
                    </svg>
                  </div>
                </span>
                <div className="d-flex flex-grow-1 align-items-start pb-2">
                  <div>
                    <p className={styles.add_comment_title}>
                      دیدگاه خود را درباره این کالا بنویسید
                    </p>
                    {/* <p className={styles.add_comment_text}>
                      با ثبت دیدگاه بر روی کالاهای خریداری شده ۵ امتیاز در
                      دیجی‌کلاب دریافت کنید
                    </p> */}
                  </div>

                  <div className="d-flex me-auto pe-3" aria-hidden="false">
                    <svg className={styles.add_comment_chevron_icon}>
                      <use href="#chevronLeft"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </section>
      <QuestionSection />
    </section>
  );
}

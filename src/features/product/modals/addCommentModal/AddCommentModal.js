"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import FlexibleCommentIdentityModal from "./FlexibleCommentIdentityModal";

import styles from "./addCommentModal.module.css";

function AddCommentModal() {
  const {
    activeVariant,
    productDetails,
    postComment,
    isLoadingPostComment,
    refetchComments,
    selectedIdentity,
  } = useProductContext();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { openModal, closeModal } = useModal();
  const [comment, setComment] = useState("");
  const minCharsToEnable = 110;

  useEffect(() => {
    import("@ebcom/dotlottie-player");
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const postCommentHandler = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    const newComment = {
      comment,
      is_anonymous: selectedIdentity === "anonymous",
      rating: 0,
      purchased_item: {
        seller: {
          id: activeVariant.id,
          title: activeVariant.seller.title,
          company_name: activeVariant.seller.company_name,
          url: activeVariant.seller.url,
          code: activeVariant.seller.code,
          rate: activeVariant.seller.rating.total_rate,
          active: true,
        },

        color: {
          id: activeVariant.color.id,
          title: activeVariant.color.title,
          hex_code: activeVariant.color.hex_code,
        },
      },
    };

    console.log("✅ NEW COMMENT =>", newComment);

    postComment(newComment, {
      onSuccess: (res) => {
        console.log("COMMENT SUCCESS =>", res);

        refetchComments();
        setIsSubmitted(true);
      },

      onError: (error) => {
        console.error("COMMENT ERROR =>", error);
        alert(error?.message || "خطا در ثبت دیدگاه");
      },
    });
  };

  return (
    <div
      className={`${styles.layout} ${isSubmitted ? styles.layout_height : ""}`}
    >
      {!isSubmitted && (
        <div className={styles.header}>
          <div className="d-flex align-items-center">
            <div className="flex-grow-1">
              <div className={styles.header_bb}>
                <div className={styles.title_container}>
                  <div className="d-flex align-items-center">
                    <div className="d-flex" onClick={() => closeModal()}>
                      <div
                        data-icon-name="cube-nav-arrow-right"
                        data-icon="&#xE955;"
                        className={`${styles.close_btn} cube-font-icon`}
                      ></div>
                    </div>
                    <span className={styles.title}>ثبت دیدگاه</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isSubmitted ? (
        <>
          <div className="d-flex flex-column overflow-y-auto flex-grow-1">
            <div className="d-flex flex-column flex-grow-1 p-0">
              <div className={styles.content_container}>
                <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center position-relative mx-2">
                  <div className={styles.thankyou_logo_container}>
                    <Image
                      width={150}
                      height={150}
                      src="/images/svg/add-comment-thank-you.svg"
                      alt=""
                      title=""
                    />
                  </div>
                  <p className={styles.thankyou_title}>
                    صبا عزیز! از مشارکتتان ممنونیم!
                  </p>
                  <div className={styles.thankyou_text}>
                    ممکن است کمی زمان ببرد تا دیدگاه شما پس از بررسی نمایش داده
                    شود.
                  </div>
                  <div className={styles.thankyou_animation_container}>
                    <dotlottie-player
                      autoplay
                      loop
                      mode="normal"
                      src="/statics/lottie/thank-you.lottie"
                      background="transparent"
                    ></dotlottie-player>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div className="w-100">
              <button
                style={{ marginBottom: "8px" }}
                className={styles.submit_btn}
                onClick={() => {
                  setComment("");
                  closeModal();
                }}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  بازگشت
                </div>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-100 flex-grow-1 d-flex flex-column overflow-y-auto">
            <div className="flex-grow-1 d-flex flex-column p-0">
              <div>
                <div className={styles.content_container}>
                  <div className="d-flex flex-column align-items-start">
                    <div className="d-flex align-items-start">
                      <span className="d-flex flex-column align-items-start mb-3">
                        <div className={styles.product_img_container}>
                          <picture>
                            <source
                              type="image/webp"
                              srcSet={productDetails?.images?.main?.url?.[0]}
                            />
                            <source
                              type="image/jpeg"
                              srcSet={productDetails?.images?.main?.url?.[0]}
                            />
                            <img
                              className={styles.product_img}
                              src={productDetails?.images?.main?.url?.[0]}
                              alt={productDetails?.title_fa}
                              title=""
                            />
                          </picture>
                        </div>
                      </span>
                      <div style={{ marginRight: "12px" }}>
                        <span>
                          <p className={styles.product_name}>
                            {productDetails?.title_fa ||
                              productDetails?.productTestTitleFa}
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <form action="">
                    <div style={{ borderBottom: "1px solid #f0f0f1" }}></div>
                    <div style={{ margin: "20px 0" }}>
                      <div className="mb-2 d-flex align-items-center justify-content-between">
                        <span className={styles.product_required_badge}>
                          متن دیدگاه:
                        </span>
                        {comment.length >= 3 &&
                          comment.length <= minCharsToEnable && (
                            <div
                              className={`${styles.chip_small} ${styles.chip_small_active_success}`}
                            >
                              پیشنهاد می‌کنیم دیدگاهت رو کامل‌تر کنی
                            </div>
                          )}
                        {comment.length > minCharsToEnable && (
                          <div
                            className={`${styles.chip_small} ${styles.chip_small_mid_dark}`}
                          >
                            ممنون که دیدگاه مفیدی برای کاربران می‌نویسی
                          </div>
                        )}
                      </div>
                      <label htmlFor="commentInput" className="w-100">
                        <div className={styles.content_textarea_container}>
                          <div className="flex-grow-1">
                            <textarea
                              id="commentInput"
                              name="comment"
                              placeholder="نظر خود را در مورد این کالا با کاربران دیگر به اشتراک بگذارید.."
                              autoComplete="off"
                              className={styles.content_textarea}
                              value={comment}
                              onChange={handleChange}
                            ></textarea>
                          </div>
                        </div>
                      </label>
                      <div className={styles.author_infos_container}>
                        <span className={styles.author_name}>
                          {selectedIdentity === "anonymous"
                            ? "کاربر دیجی‌کالا"
                            : "صبا امیدفر"}
                        </span>
                        <div
                          className={styles.author_infos}
                          onClick={() =>
                            openModal(<FlexibleCommentIdentityModal />, {
                              name: "flexible-comment-identity",
                              className: "rounded-medium ",
                            })
                          }
                        >
                          <span className={styles.author_selector}>
                            ارسال{" "}
                            {selectedIdentity === "anonymous"
                              ? "ناشناس"
                              : "با نام شما"}
                          </span>
                          <div className="d-flex">
                            <div
                              data-icon-name="cube-nav-chevron-down"
                              data-icon="&#xE9BF;"
                              className={`${styles.chevron_btn} cube-font-icon`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.footer}>
                      <div className="w-100">
                        <button
                          className={`${styles.submit_btn} ${
                            comment.length >= 3
                              ? ""
                              : styles.submit_disabled_btn
                          }`}
                          disabled={comment.length < 3}
                          onClick={postCommentHandler}
                        >
                          <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                            ثبت دیدگاه
                          </div>
                        </button>
                        <p className={styles.comments_rules_text}>
                          ثبت دیدگاه به معنی موافقت با
                          <Link
                            className={styles.comments_rules_link}
                            target="_blank"
                            href="/page/comments-rules/"
                          >
                            قوانین انتشار دیجی‌کالا
                          </Link>
                          است.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddCommentModal;

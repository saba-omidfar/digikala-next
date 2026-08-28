import { useRef } from "react";
import { useRouter } from "next/navigation";

import ProductContentTitle from "@/features/product/sections/productContent/productContentTitle/ProductContentTitle";
import AddCommentModal from "@/features/product/modals/addCommentModal/AddCommentModal";
import CommentScores from "@/components/modules/scores/CommentScores";
import CommentBoxDesktop from "@/features/product/sections/commentBoxDesktop/CommentBoxDesktop";

import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";

import { useModal } from "@/contexts/modalContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./comments.module.css";

function Comments({ topOffset }) {
  const commentsRef = useRef();
  const { openModal } = useModal();

  const router = useRouter();
  const { productDetails } = useProductContext();
  const { user } = useUserContext();

  return (
    <div className="lazyload-wrapper">
      <div id="commentSection" ref={commentsRef}>
        <section>
          <div className={styles.comment_box_border}>
            <ProductContentTitle title="دیدگاه‌ها" />
            <div className="d-flex justify-content-start align-items-start mt-3">
              <div
                className={styles.comment_question_summary}
                style={{ top: `${topOffset}px` }}
              >
                {productDetails?.rating?.rate ? (
                  <div className="d-flex align-items-center">
                    <p className={styles.comment_question_score}>
                      {toPersianDigits(
                        Math.round(
                          (productDetails?.rating?.rate / 100) * 5 * 10,
                        ) / 10,
                      )}
                    </p>
                    <p style={{ fontSize: "10px" }}> از ۵ </p>
                  </div>
                ) : (
                  <p className={styles.no_comment_question_score}>
                    هنوز امتیازی ثبت نشده است
                  </p>
                )}
                <div className="d-flex align-items-center">
                  {productDetails?.rating?.rate ? (
                    <>
                      <CommentScores
                        width={`${productDetails?.rating?.rate}%`}
                      />
                      <p className={styles.comment_question_score_text}>
                        {`از مجموع ${toPersianDigits(
                          productDetails?.rating?.count,
                        )} امتیاز`}
                      </p>
                    </>
                  ) : (
                    <CommentScores width={`0%`} />
                  )}
                </div>
                <p className={styles.add_comment_text}>
                  شما هم درباره این کالا دیدگاه ثبت کنید
                </p>
                <button
                  className={styles.add_comment_btn}
                  onClick={() =>
                    user
                      ? openModal(<AddCommentModal />, {
                          name: "add-comment",
                          className: "modal__add_comment rounded-medium",
                        })
                      : router.push("/users/login")
                  }
                >
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    ثبت دیدگاه
                  </div>
                </button>
              </div>
              <CommentBoxDesktop />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Comments;

import { useEffect } from "react";

import AiCommentDetailsModal from "@/features/product/modals/aiCommentDetailsModal/AiCommentDetailsModal";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./aiCommentBoxMobile.module.css";

function AiCommentBoxMobile() {
  const { openModal } = useModal();
  const { productDetails } = useProductContext();

  useEffect(() => {
    import("@ebcom/dotlottie-player");
  }, []);

  if (!productDetails?.comments_overview) return null;

  return (
    <div
      className={styles.container}
      onClick={() =>
        openModal(<AiCommentDetailsModal />, {
          name: "ai-comment-details",
          className: "modal__ai_comment",
          size: "full",
        })
      }
    >
      <div className="d-flex align-items-center">
        <div className={styles.ai_icon}>
          <dotlottie-player
            autoplay
            loop
            mode="normal"
            src="/statics/lottie/ai.lottie"
            background="transparent"
          ></dotlottie-player>
        </div>
        <div className={styles.title}>خلاصه دیدگاه‌های خریداران</div>
      </div>
      <div className={styles.aiCommentBody_container}>
        <span style={{ display: "block", marginBottom: "8px" }}>
          {productDetails?.comments_overview?.overview}
        </span>
      </div>
      <span className={styles.see_more_btn}>
        <span>مشاهده بیشتر</span>
      </span>
      <div className="d-flex justify-content-between align-items-center mt-auto">
        <div className={styles.badge}>تولید شده با هوش مصنوعی</div>
      </div>
    </div>
  );
}

export default AiCommentBoxMobile;

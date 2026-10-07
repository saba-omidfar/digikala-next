import Link from "next/link";

import styles from "./questionItem.module.css";
import AnswerItem from "./answerItem/AnswerItem";

export default function QuestionItem({ question, refetch }) {
  const status = question?.status;

  const statusConfig = {
    accepted: {
      badgeClass: styles.question_accepted_badge,
      title: "تایید شده",
    },

    pending: {
      badgeClass: styles.question_pending_badge,
      title: "در انتظار بررسی",
    },

    rejected: {
      badgeClass: styles.question_rejected_badge,
      title: "رد شده",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;

  return (
    <div className={styles.question_container}>
      <div className="d-flex flex-column justify-content-between w-100">
        <Link
          className={styles.product_link}
          href={question?.product?.url?.uri || "#"}
        >
          <div
            className={styles.product_img_container}
            role="img"
            aria-hidden="false"
            aria-label={question?.product?.title_fa}
          >
            <picture>
              <source
                type="image/webp"
                srcSet={question?.product?.images?.main?.url?.[0]}
              />
              <source
                type="image/jpeg"
                srcSet={question?.product?.images?.main?.url?.[0]}
              />
              <img
                className={styles.product_img}
                alt={question?.product?.title_fa}
                title=""
                src={question?.product?.images?.main?.url?.[0]}
              />
            </picture>
          </div>
          <div className={styles.product_infos}>
            <div className={styles.product_title}>
              {question?.product?.title_fa}
            </div>
            <div
              className={`${styles.question_badge} ${currentStatus.badgeClass}`}
            >
              <p className={styles.question_status_title}>
                {currentStatus.title}
              </p>
            </div>
          </div>
        </Link>
        <article className={styles.question_body_container}>
          <div className="d-flex align-items-start">
            <p className={styles.question_body}>{question?.text}</p>
          </div>
          {question?.answers?.length ? (
            <div className="w-100">
              {question?.answers?.map((answer) => (
                <AnswerItem key={answer.id} answer={answer} />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </article>
      </div>
    </div>
  );
}

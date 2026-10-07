import { useQuestions } from "@/features/profile/hooks/useQuestions";

import styles from "./questionsList.module.css";
import CircleLoading from "@/components/modules/circleLoading/CircleLoading";
import QuestionItem from "./questionItem/QuestionItem";

export default function QuestionsList() {
  const { data, refetch, isLoading } = useQuestions();

  return (
    <li>
      {isLoading ? (
        <CircleLoading margin="80px 0" size={6} />
      ) : (
        <div>
          {!data?.questions?.length ? (
            <div className={styles.list_empty_container}>
              <div
                className={styles.list_empty_img_container}
                role="img"
                aria-hidden="false"
                aria-label="بدون نظر"
              >
                <img
                  className={styles.list_empty_img}
                  alt="بدون نظر"
                  title=""
                  src="https://www.digikala.com/statics/img/svg/question-empty-state.svg"
                />
              </div>
              <p className={styles.list_empty_title}>تا به حال پرسشی نداشتی</p>
            </div>
          ) : (
            data?.questions?.map((question) => (
              <QuestionItem
                key={question?.id}
                question={question}
                refetch={refetch}
              />
            ))
          )}
        </div>
      )}
    </li>
  );
}

import Link from "next/link";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import styles from "./questionList.module.css";

function QuestionList({ questions }) {
  if (!questions?.length) return null;

  return (
    <div className={styles.faq_questions_container}>
      {questions?.map((question, index) => (
        <Accordion
          id="faq-written-questions"
          key={question?.id}
          className={`${styles.faq_question} ${
            index === 0 ? "border-none" : ""
          }`}
        >
          <AccordionSummary
            expandIcon={
              <div className={styles.arrow_icon_container} aria-hidden="false">
                <svg className={styles.arrow_icon}>
                  <use href="#chevronDown"></use>
                </svg>
              </div>
            }
          >
            <Typography component="span">{question?.title}</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{
                __html: question?.short_answers
                  ?.map((a) =>
                    a.replace(/\r?\n/g, " ").replace(/&lt;br\/&gt;/g, "<br />"),
                  )
                  .join(""),
              }}
            />

            {question?.see_more_url?.uri && (
              <Link
                className={styles.question_short_answer_link}
                href={question.see_more_url.uri}
              >
                مشاهده توضیحات تکمیلی
              </Link>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
export default QuestionList;

import Link from "next/link";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { useGetDigiplus } from "@/features/plus/hooks/useDigiplus";

import styles from "./plusQuestions.module.css";

export default function PlusQuestions() {
  const { data } = useGetDigiplus();

  return (
    <div className={styles.questions_container}>
      {data?.faq?.[0]?.questions
        ?.sort((a, b) => a.sort - b.sort)
        ?.map((question, index) => (
          <Accordion
            id="faq-written-questions"
            key={question?.id}
            className={`${styles.faq_question} ${
              index === 0 ? "border-none" : ""
            }`}
          >
            <AccordionSummary
              expandIcon={
                <svg className={styles.arrow_icon}>
                  <use href="#chevronDown"></use>
                </svg>
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
                      a
                        .replace(/\r?\n/g, " ")
                        .replace(/&lt;br\/&gt;/g, "<br />"),
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

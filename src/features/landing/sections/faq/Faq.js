import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "./faq.module.css";

function Faq({ data, isLandingPage }) {
  return (
    <div
      className="w-100 d-flex justify-content-center overflow-hidden position-relative"
      style={{ background: isLandingPage ? "rgb(239, 247, 251)" : "" }}
    >
      <div className={styles.container}>
        <div
          className={styles.content}
          style={{
            backgroundColor: isLandingPage ? "hsl(199,60%,96%)" : "#fff",
          }}
        >
          <div className={styles.faq_title_container}>
            <div className="d-flex" aria-hidden="false">
              <svg
                className={styles.faq_icon}
                style={{ fill: isLandingPage ? "hsl(199,80%,40%)" : "#ef4056" }}
              >
                <use href="#question"></use>
              </svg>
            </div>
            <div className={styles.faq_title}>
              <div className="d-flex align-items-center flex-grow-1">
                <p className={styles.faq_title_text}>
                  <span className="position-relative">
                    {data?.data?.faq?.title}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {data?.data?.faq?.questions?.map((question, index) => (
            <Accordion
              id="faq-written-questions"
              key={question?.id}
              className={`${isLandingPage ? styles.landing_faq_question : styles.faq_question} ${
                index === 0 ? "border-none" : ""
              }`}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={{
                      fill: isLandingPage ? "rgb(20, 132, 184)" : "#ef4056",
                    }}
                  />
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

                {/* {question?.see_more_url?.uri && (
                  <Link
                    className={styles.question_short_answer_link}
                    href={question.see_more_url.uri}
                  >
                    مشاهده توضیحات تکمیلی
                  </Link>
                )} */}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;

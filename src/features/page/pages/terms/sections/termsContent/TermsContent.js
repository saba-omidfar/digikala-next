"use client";

import Image from "next/image";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { useTerms } from "@/features/page/pages/terms/hooks/useTerms";
import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./termsContent.module.css";

export default function TermsContent() {
  const { data: terms } = useTerms();
  const { data: topMegaMenuBanners } = useGetUniversal();

  return (
    <div
      className={styles.container}
      style={{ paddingTop: topMegaMenuBanners ? 168 : 108 }}
    >
      <div className={styles.content_container}>
        <section className={styles.content}>
          <div className={styles.img_container}>
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              src="/images/svg/T&C.svg"
              alt="شرایط و قوانین"
            />
          </div>
          <h1 className={styles.title}>
            شرایط و قوانین استفاده از سرویس‌ها و خدمات دیجی‌کالا
          </h1>
          <p className={styles.paragraph}>
            کاربر گرامی لطفاً موارد زیر را جهت استفاده بهینه از خدمات و
            برنامه‌‏های کاربردی دیجی‌کالا به دقت ملاحظه فرمایید.
            <br />
            ورود کاربران به وب‏‌سایت دیجی‌کالا هنگام استفاده از پروفایل شخصی،
            طرح‏‌های تشویقی، ویدئوهای رسانه تصویری دیجی‌کالا و سایر خدمات ارائه
            شده توسط دیجی‌کالا به معنای آگاه بودن و پذیرفتن شرایط و قوانین و
            همچنین نحوه استفاده از سرویس‌‏ها و خدمات دیجی‌کالا است. توجه داشته
            باشید که ثبت سفارش نیز در هر زمان به معنی پذیرفتن کامل کلیه شرایط و
            قوانین دیجی‌کالا از سوی کاربر است. لازم به ذکر است شرایط و قوانین
            مندرج، جایگزین کلیه توافق‏‌های قبلی محسوب می‏‌شود.
          </p>
          <div className={styles.terms}>
            {terms?.map((term, index) => (
              <Accordion
                key={term?.id}
                className={`${index === 0 ? "border-none" : ""}`}
              >
                <AccordionSummary
                  expandIcon={
                    <div
                      className={styles.arrow_icon_container}
                      aria-hidden="false"
                    >
                      <svg className={styles.arrow_icon}>
                        <use href="#chevronDown"></use>
                      </svg>
                    </div>
                  }
                >
                  <Typography component="span">{term.title}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: term.content
                        .replace(/<pre>/g, "<div>")
                        .replace(/<\/pre>/g, "</div>")
                        .replace(/\r?\n/g, " ")
                        .replace(/&lt;br\/&gt;/g, "<br />"),
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

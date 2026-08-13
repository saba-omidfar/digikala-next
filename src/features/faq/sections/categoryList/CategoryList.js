import Image from "next/image";
import Link from "next/link";

import styles from "./categoryList.module.css";

function CategoryList({ categories, frequentQuestions }) {
  return (
    <div className={styles.base_layout_desktop__content_wrapper}>
      <div className={styles.base_layout_desktop__content}>
        {/* categories title */}
        <div className={styles.header_categories_container}>
          <div className={styles.faq_questions_title_icon}>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.faq_icon}>
                <use href="#categoryOutline"></use>
              </svg>
            </div>
          </div>
          <div className={styles.faq_title_container}>
            <p className={styles.faq_title}>دسته‌بندی پرسش‌ها</p>
          </div>
        </div>

        {/* categories list */}
        <div className={styles.faq_categories_container}>
          {categories?.map((category) => (
            <Link
              key={category?.id}
              className={styles.faq_category_link}
              href={category?.see_more_url?.uri}
            >
              <Image
                width={40}
                height={40}
                className={styles.faq_category_img}
                src={category?.icon?.url?.[0]}
                alt={category?.title}
              />
              <div className={styles.faq_category_name}>{category?.title}</div>
            </Link>
          ))}
        </div>

        {/* Frequent Questions */}
        {frequentQuestions && (
          <>
            <div className={styles.header_questions_container}>
              <div className={styles.faq_questions_title_icon}>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.faq_icon}>
                    <use href="#question"></use>
                  </svg>
                </div>
              </div>
              <div className={styles.faq_title_container}>
                <p className={styles.faq_title}>پرسش‌های متداول</p>
              </div>
            </div>

            {/* <QuestionList questions={frequentQuestions} /> */}
          </>
        )}
      </div>
    </div>
  );
}
export default CategoryList;

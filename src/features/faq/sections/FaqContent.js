"use client";

import HeaderInfo from "@/features/faq/sections/headerInfo/HeaderInfo";
import QuestionList from "@/features/faq/sections/questionList/QuestionList";
import CategoryList from "@/features/faq/sections/categoryList/CategoryList";
import QuestionContent from "@/features/faq/sections/questionContent/QuestionContent";

import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

export default function FaqContent({
  hasSearch,
  searchResult,
  mainQuestionsCategory,
  mainQuestion,
  categories,
  frequentQuestions,
  headerInfo,
  isHeaderLoading,
}) {
  return (
    <>
      {!isHeaderLoading ? (
        <HeaderInfo
          headerInfo={headerInfo}
          hasSearch={hasSearch}
          mainQuestion={mainQuestion}
        />
      ) : (
        <LoadingModal />
      )}

      {hasSearch && <QuestionList questions={searchResult} />}

      {mainQuestionsCategory && (
        <QuestionList questions={mainQuestionsCategory} />
      )}

      {mainQuestion && (
        <QuestionContent
          answers={mainQuestion?.question?.long_answer_sections}
        />
      )}

      {categories && (
        <CategoryList
          categories={categories}
          frequentQuestions={frequentQuestions}
        />
      )}

      {frequentQuestions && (
        <QuestionList
          questions={
            mainQuestion ? mainQuestion?.frequent_questions : frequentQuestions
          }
        />
      )}
    </>
  );
}

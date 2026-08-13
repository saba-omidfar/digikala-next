"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import {
  useGetFaq,
  useGetFaqCategory,
  useGetFaqQuestion,
} from "@/features/faq/hooks/useFaq";

export function useFaqPage(categoryId, questionId) {
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";

  const { data: faqData, isLoading } = useGetFaq(1, query);

  const { data: mainCategory, isLoading: mainCategoryIsLoading } =
    useGetFaqCategory(categoryId);

  const { data: mainQuestion, isLoading: mainQuestionIsLoading } =
    useGetFaqQuestion(questionId);

  const hasSearch = Boolean(query);

  const searchResult = faqData?.search_result;
  const frequentQuestions = faqData?.frequent_questions;
  const categories = faqData?.categories;
  const mainQuestionsCategory = mainCategory?.faq?.questions;

  const isHeaderLoading =
    (categoryId && mainCategoryIsLoading) ||
    (questionId && mainQuestionIsLoading) ||
    (!categoryId && !questionId && isLoading);

  const headerInfo = useMemo(() => {
    if (mainCategory) {
      return {
        icon: mainCategory?.faq?.icon?.url?.[0],
        title: mainCategory?.faq?.title,
        subtitle: null,
        showInput: false,
      };
    }

    if (mainQuestion) {
      return {
        title: mainQuestion?.question?.title,
        subtitle: null,
        showInput: false,
      };
    }

    if (hasSearch) {
      return {
        icon: null,
        title: "نتایج جستجو",
        subtitle: null,
        showInput: true,
      };
    }

    return {
      icon: null,
      title: "موضوع پرسش شما چیست؟",
      subtitle:
        "موضوع موردنظرتان را جستجو کرده یا از دسته‌بندی زیر انتخاب کنید",
      showInput: true,
    };
  }, [mainCategory, mainQuestion, hasSearch]);

  return {
    hasSearch,
    searchResult,
    mainQuestionsCategory,
    mainQuestion,
    categories,
    frequentQuestions,
    headerInfo,
    isHeaderLoading,
  };
}

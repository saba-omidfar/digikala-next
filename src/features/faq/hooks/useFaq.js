import { useQuery } from "react-query";
import {
  fetchFaq,
  fetchFaqCategory,
  fetchFaqQuestion,
} from "@/services/axios/Requests/faqRequests";

export function useGetFaq(page = 1, query = "") {
  return useQuery(["Faq", page, query], () => fetchFaq(page, query));
}

export function useGetFaqCategory(categoryId) {
  return useQuery(
    ["FaqCategory", categoryId],
    () => fetchFaqCategory(categoryId),
    {
      enabled: !!categoryId,
    },
  );
}

export function useGetFaqQuestion(questionId) {
  return useQuery(
    ["FaqQuestion", questionId],
    () => fetchFaqQuestion(questionId),
    {
      enabled: !!questionId,
    },
  );
}

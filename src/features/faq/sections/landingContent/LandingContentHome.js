import FaqContent from "@/features/faq/sections/FaqContent";

import { useGetFaq } from "@/features/faq/hooks/useFaq";

export default function LandingContentHome() {
  const { data: faqData } = useGetFaq();

  return (
    <FaqContent
      headerInfo={{ title: "موضوع پرسش شما چیست?", showInput: true }}
      searchResult={faqData?.search_result}
      mainQuestions={null}
      categories={faqData?.categories}
      frequentQuestions={faqData?.frequent_questions}
      showLoading={false}
    />
  );
}

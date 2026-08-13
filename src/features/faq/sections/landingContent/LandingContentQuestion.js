import FaqContent from "@/features/faq/sections/FaqContent";

import { useGetFaqQuestion } from "@/features/faq/hooks/useFaq";

export default function LandingContentQuestion({ questionId }) {
  const { data: mainQuestion } = useGetFaqQuestion(questionId);

  return (
    <FaqContent
      headerInfo={{
        title: mainQuestion?.question?.title,
        showInput: false,
      }}
      mainQuestions={[mainQuestion?.question]}
      searchResult={null}
      categories={null}
      frequentQuestions={null}
      showLoading={!mainQuestion}
    />
  );
}

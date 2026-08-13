import FaqContent from "@/features/faq/sections/FaqContent";

import { useGetFaqCategory } from "@/features/faq/hooks/useFaq";

export default function LandingContentCategory({ categoryId }) {
  const { data: mainCategory } = useGetFaqCategory(categoryId);

  return (
    <FaqContent
      headerInfo={{
        title: mainCategory?.faq?.title,
        showInput: false,
      }}
      mainQuestions={mainCategory?.faq?.questions}
      searchResult={null}
      categories={null}
      frequentQuestions={null}
      showLoading={!mainCategory}
    />
  );
}

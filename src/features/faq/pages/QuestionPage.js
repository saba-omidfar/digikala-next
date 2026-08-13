"use client";

import { useParams } from "next/navigation";

import FaqMobileContent from "@/features/faq/mobile/FaqMobileContent";
import FaqDesktopContent from "@/features/faq/desktop/FaqDesktopContent";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function QuestionPage() {
  const { isSmallScreen, isClientReady } = useScreenStatus();
  const { questionId } = useParams();

  if (!isClientReady) return null;

  return (
    <>
      {isSmallScreen ? (
        <FaqMobileContent questionId={questionId} />
      ) : (
        <FaqDesktopContent questionId={questionId} />
      )}
    </>
  );
}

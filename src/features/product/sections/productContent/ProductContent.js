"use client";

import { useState, useEffect } from "react";

import { ScrollTrigger } from "@/lib/gsap";

import ShortReview from "@/features/product/sections/productContent/shortReview/ShortReview";
import ExpertReview from "@/features/product/sections/productContent/expertReview/ExpertReview";
import Specification from "@/features/product/sections/productContent/specification/Specification";
import SellerRecommendations from "@/features/product/sections/productContent/sellerRecommendations/SellerRecommendations";
import Comments from "@/features/product/sections/productContent/comments/Comments";
import Questions from "@/features/product/sections/productContent/questions/Questions";

import styles from "./productContent.module.css";

function ProductContent() {
  const [isCommentSectionSticky, setIsCommentSectionSticky] = useState(false);
  const [isQuestionSectionSticky, setIsQuestionSectionSticky] = useState(false);

  useEffect(() => {
    const commentSectionTrigger = ScrollTrigger.create({
      trigger: "#commentSection",
      start: "top 0%",
      end: "bottom 50%",
      onEnter: () => setIsCommentSectionSticky(true),
      onLeaveBack: () => setIsCommentSectionSticky(false),
      immediateRender: false,
    });
    ScrollTrigger.refresh();
    return () => commentSectionTrigger.kill();
  }, []);

  useEffect(() => {
    const questionSectionTrigger = ScrollTrigger.create({
      trigger: "#questionSection",
      start: "top 0%",
      end: "bottom 50%",
      onEnter: () => setIsQuestionSectionSticky(true),
      onLeaveBack: () => setIsQuestionSectionSticky(false),
      immediateRender: false,
    });

    return () => questionSectionTrigger.kill();
  }, []);

  return (
    <>
      <div className={styles.product_content_container}>
        <ShortReview />
        <ExpertReview />
        <Specification />
        <SellerRecommendations />
        <Comments isCommentSectionSticky={isCommentSectionSticky} />
        <Questions isQuestionSectionSticky={isQuestionSectionSticky} />
      </div>
    </>
  );
}

export default ProductContent;

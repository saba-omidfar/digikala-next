import { useState, useEffect } from "react";

import ShortReview from "@/features/product/sections/productContent/shortReview/ShortReview";
import ExpertReview from "@/features/product/sections/productContent/expertReview/ExpertReview";
import Specification from "@/features/product/sections/productContent/specification/Specification";
import SellerRecommendations from "@/features/product/sections/productContent/sellerRecommendations/SellerRecommendations";
import Comments from "@/features/product/sections/productContent/comments/Comments";
import Questions from "@/features/product/sections/productContent/questions/Questions";

import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./productContent.module.css";

export default function ProductContent() {
  const { data: topMegaMenuBanners } = useGetUniversal();

  const [topOffset, setTopOffset] = useState(234);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScrollY) {
        setTopOffset(
          (topMegaMenuBanners?.desktop || topMegaMenuBanners?.mobile)?.length
            ? 234
            : 173,
        );
      } else {
        setTopOffset(
          (topMegaMenuBanners?.desktop || topMegaMenuBanners?.mobile)?.length
            ? 188
            : 173,
        );
      }

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={styles.product_content_container}>
      <ShortReview />
      <ExpertReview />
      <Specification />
      <SellerRecommendations />
      <Comments topOffset={topOffset} />
      <Questions topOffset={topOffset} />
    </div>
  );
}

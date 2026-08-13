"use client";

import { useState, useEffect, useMemo } from "react";
import { createContext, useContext } from "react";
import { useParams } from "next/navigation";

import {
  useGetProductDetails,
  useGetSuggestionProducts,
  useGetProductSizeGuide,
  useGetProductTrueToSize,
  useSellerRecommendationProducts,
  useProductComments,
  useProductQuestions,
  useProductMediaComments,
  useProductTabularRecommendation,
  useProductRecommendation,
  useGetSupplementRecommendationProducts,
  useProductFeedback,
  useAddIncredibleNotification,
  useRemoveIncredibleNotification,
  useGetIncredibleNotificationStatus,
  useAddFavorite,
  useRemoveFavorite,
  useGetFavoriteStatus,
  useAddToRecentViewed,
  useGetRecentViewed,
  usePostComment,
  usePostQuestion,
  usePostAnswer,
} from "@/hooks/useProduct";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { productParams } = useParams();
  const productId = productParams?.[0]?.replace("dkp-", "");

  const [selectedIdentity, setSelectedIdentity] = useState("anonymous");

  const [currentPage, setCurrentPage] = useState(1);
  const [activeIntent, setActiveIntent] = useState(null);
  const [activeCommentsSort, setActiveCommentsSort] = useState("default");
  const [activeQuestionSort, setActiveQuestionSort] = useState("created_at");
  const [isInfiniteComments, setIsInfiniteComments] = useState(false);
  const [isInfiniteQuestions, setIsInfiniteQuestions] = useState(false);
  const [activeOffset, setActiveOffset] = useState(0);

  const [isSelectedColor, setIsSelectedColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [productThemes, setProductThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [availableValues, setAvailableValues] = useState([]);
  const [activeVariant, setActiveVariant] = useState(null);

  const { data: productDetails, isLoading: isLoadingProductDetails } =
    useGetProductDetails(productId);

  const { data: feedbackData, isLoading: feedBackDataIsLoading } =
    useProductFeedback(productId);

  const { data: suggestionProducts, isLoading: isLoadingSuggestionProducts } =
    useGetSuggestionProducts(productId);

  const { data: sizeGuide, isLoading: sizeGuideIsLoading } =
    useGetProductSizeGuide(productId);

  const { data: trueToSize, isLoading: trueToSizeLoading } =
    useGetProductTrueToSize(productId);

  // ADD COMMENT & QUESTION & ANSWER
  const { mutate: postComment, isLoading: isLoadingPostComment } =
    usePostComment(productId);
  const { mutate: postQuestion, isLoading: isLoadingPostQuestion } =
    usePostQuestion(productId);
  const { mutate: postAnswer, isLoading: isLoadingPostAnswer } =
    usePostAnswer();

  // RELATED PRODUCTS

  // NOTIFICATIONS
  const {
    mutate: addIncredibleNotification,
    isLoading: isLoadingAddIncredibleNotification,
  } = useAddIncredibleNotification();
  const { mutate: removeIncredibleNotification } =
    useRemoveIncredibleNotification();
  const { data: incredibleStatus, isLoading: isLoadingIncredibleStatus } =
    useGetIncredibleNotificationStatus({ productId });

  // FaAVORITES
  const { mutate: addFavorite, isLoading: isLoadingAddFavorite } =
    useAddFavorite();
  const { mutate: removeFavorite, isLoading: isLoadingRemoveFavorite } =
    useRemoveFavorite();
  const { data: favotiteStatus, isLoading: isLoadingFavoriteStatus } =
    useGetFavoriteStatus({ productId });

  // RECENT_VIEWED
  const { mutate: addToRecentViewed, isLoading: isLoadingAddRecentViewed } =
    useAddToRecentViewed();
  const { data: recentViewed, isLoading: isLoadingGetRecentViewd } =
    useGetRecentViewed();

  const {
    commentsData,
    comments,
    isLoadingComments,
    refetch: refetchComments,
  } = useProductComments(
    productId,
    currentPage,
    setCurrentPage,
    activeCommentsSort,
    activeIntent,
    isInfiniteComments,
  );

  const {
    questionsData,
    questions,
    isLoadingQuestions,
    refetch: refetchQuestions,
  } = useProductQuestions(
    productId,
    currentPage,
    setCurrentPage,
    activeQuestionSort,
    isInfiniteQuestions,
  );

  const { data: tabularRecommendation, isLoadingTabularRecommendation } =
    useProductTabularRecommendation(productId, activeOffset);

  const { data: mediaComments, isLoading: isLoadingMediaComments } =
    useProductMediaComments(productId);

  const { data: recommendations, isLoading: isLoadingRecommendation } =
    useProductRecommendation(productId);

  const { data: supplementRecommendation } =
    useGetSupplementRecommendationProducts(productId);

  const { data: cpc, isLoading: isLoadingCpc } =
    useSellerRecommendationProducts(productId);

  const uniqueVariants = useMemo(() => {
    if (!activeVariant?.properties?.has_similar_variants) return [];

    return (
      productDetails?.variants?.filter(
        (variant) =>
          variant.properties.has_similar_variants ===
            activeVariant.properties.has_similar_variants &&
          variant.color?.id === activeVariant.color?.id,
      ) ?? []
    );
  }, [productDetails?.variants, activeVariant]);

  const lowestPrice = useMemo(() => {
    if (!productDetails?.variants?.length) return null;

    const variants = productDetails?.variants?.filter(
      (variant) =>
        variant.properties.has_similar_variants ===
          activeVariant?.properties?.has_similar_variants &&
        (variant?.color ? variant?.color?.id === activeVariant?.color?.id : ""),
    );

    return Math.min(
      ...variants.map((variant) => variant?.price?.selling_price ?? Infinity),
    );
  }, [activeVariant]);

  useEffect(() => {
    if (!productDetails?.default_variant?.themes) return;

    const variantThemes = productDetails?.variants?.flatMap(
      (variant) => variant.themes,
    );

    const productTheme = variantThemes?.reduce((acc, theme) => {
      const { type, is_main, label, value } = theme;

      if (!acc[type]) {
        acc[type] = {
          is_main,
          label,
          type,
          values: [],
        };
      }

      const exists = acc[type].values.some((x) => x.id === value.id);

      if (!exists) {
        acc[type].values.push(value);
      }

      return acc;
    }, {});

    const sortedProductThemes = Object.values(productTheme || {}).map(
      (theme) => {
        theme.values.sort((a, b) => {
          const aOrder = a?.sort_order ?? 9999;
          const bOrder = b?.sort_order ?? 9999;

          return aOrder - bOrder;
        });

        return theme;
      },
    );

    setProductThemes(sortedProductThemes);
  }, [productDetails]);

  useEffect(() => {
    setActiveVariant(productDetails?.default_variant);
  }, [productDetails]);

  const value = useMemo(
    () => ({
      productId,
      productDetails,
      feedbackData,
      feedBackDataIsLoading,
      suggestionProducts,
      isLoadingSuggestionProducts,
      isLoadingProductDetails,
      sizeGuide,
      sizeGuideIsLoading,
      trueToSize,
      trueToSizeLoading,
      comments,
      commentsData,
      isLoadingComments,
      refetchComments,
      setIsInfiniteComments,
      mediaComments,
      isLoadingMediaComments,
      activeIntent,
      setActiveIntent,
      currentPage,
      setCurrentPage,
      activeCommentsSort,
      setActiveCommentsSort,
      activeQuestionSort,
      setActiveQuestionSort,
      questions,
      questionsData,
      isLoadingQuestions,
      refetchQuestions,
      setIsInfiniteQuestions,
      tabularRecommendation,
      isLoadingTabularRecommendation,
      activeOffset,
      setActiveOffset,
      recommendations,
      isLoadingRecommendation,
      cpc,
      isLoadingCpc,
      supplementRecommendation,
      productThemes,
      setProductThemes,
      selectedThemes,
      setSelectedThemes,
      availableValues,
      setAvailableValues,
      isSelectedColor,
      setIsSelectedColor,
      activeVariant,
      setActiveVariant,
      uniqueVariants,
      selectedColor,
      setSelectedColor,
      selectedSize,
      setSelectedSize,
      lowestPrice,
      addIncredibleNotification,
      isLoadingAddIncredibleNotification,
      removeIncredibleNotification,
      incredibleStatus,
      isLoadingIncredibleStatus,
      addFavorite,
      isLoadingAddFavorite,
      removeFavorite,
      isLoadingRemoveFavorite,
      favotiteStatus,
      isLoadingFavoriteStatus,
      addToRecentViewed,
      isLoadingAddRecentViewed,
      recentViewed,
      isLoadingGetRecentViewd,
      postComment,
      isLoadingPostComment,
      postQuestion,
      isLoadingPostQuestion,
      selectedIdentity,
      setSelectedIdentity,
      postAnswer,
      isLoadingPostAnswer,
    }),
    [
      productId,
      productDetails,
      feedbackData,
      feedBackDataIsLoading,
      suggestionProducts,
      isLoadingSuggestionProducts,
      isLoadingProductDetails,
      comments,
      commentsData,
      isLoadingComments,
      refetchComments,
      setIsInfiniteComments,
      mediaComments,
      isLoadingMediaComments,
      activeIntent,
      setActiveIntent,
      currentPage,
      setCurrentPage,
      activeCommentsSort,
      setActiveCommentsSort,
      activeQuestionSort,
      setActiveQuestionSort,
      questions,
      questionsData,
      isLoadingQuestions,
      refetchQuestions,
      setIsInfiniteQuestions,
      tabularRecommendation,
      isLoadingTabularRecommendation,
      activeOffset,
      setActiveOffset,
      recommendations,
      isLoadingRecommendation,
      cpc,
      isLoadingCpc,
      supplementRecommendation,
      productThemes,
      setProductThemes,
      selectedThemes,
      setSelectedThemes,
      availableValues,
      setAvailableValues,
      isSelectedColor,
      setIsSelectedColor,
      activeVariant,
      setActiveVariant,
      uniqueVariants,
      selectedColor,
      setSelectedColor,
      selectedSize,
      setSelectedSize,
      lowestPrice,
      addIncredibleNotification,
      isLoadingAddIncredibleNotification,
      removeIncredibleNotification,
      incredibleStatus,
      isLoadingIncredibleStatus,
      addFavorite,
      isLoadingAddFavorite,
      removeFavorite,
      isLoadingRemoveFavorite,
      favotiteStatus,
      isLoadingFavoriteStatus,
      addToRecentViewed,
      isLoadingAddRecentViewed,
      recentViewed,
      isLoadingGetRecentViewd,
      postComment,
      isLoadingPostComment,
      postQuestion,
      isLoadingPostQuestion,
      selectedIdentity,
      setSelectedIdentity,
      postAnswer,
      isLoadingPostAnswer,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

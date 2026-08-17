import { useState, useEffect, useCallback } from "react";

import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  addIncredibleNotification,
  removeIncredibleNotification,
  getIncredibleNotificationStatus,
  addFavorite,
  removeFavorite,
  getFavoriteStatus,
  addToRecentViewed,
  getRecentViewed,
  postComment,
  postQuestion,
  postAnswer,
} from "@/services/axios/Requests/productRequests";

function useGetProductDetails(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/product/${productId}`);
      const json = await res.json();

      setData(json?.data?.product ?? null);
    } catch (error) {
      console.error("PRODUCT DETAILS ERROR =>", error);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}
function useGetSuggestionProducts(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/product/${productId}`);
      const json = await res.json();

      setData(json?.data?.dynamic_pdp_carousel ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}

function useGetProductSizeGuide(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/product/${productId}/size-guide`);
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}

function useGetProductTrueToSize(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/product/${productId}/true-to-size`);
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}

function useGetSupplementRecommendationProducts(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/product/${productId}/supplement-recommendation/`,
      );
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}

function useRecommendationProducts(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/product/${productId}/recommendation`);
      const json = await res.json();

      setData(json?.data?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}

function useSellerRecommendationProducts(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/product/${productId}/seller-recommendation`,
      );
      const json = await res.json();

      setData(json?.data?.zone_top ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}

// function useProductComments(
//   productId,
//   currentPage = 1,
//   setCurrentPage,
//   sort = "default",
//   intent = null,
// ) {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingComments, setIsLoadingComments] = useState(false);

//   const refetch = useCallback(async () => {
//     if (!productId) return;

//     setIsLoading(true);
//     setIsLoadingComments(true);

//     try {
//       const res = await fetch(
//         `/api/product/${productId}/rate-review?sort=${sort}&intent=${intent}&page=${currentPage}`,
//       );

//       const params = new URLSearchParams({
//         page: currentPage,
//         sort,
//       });

//       if (intent) {
//         params.set("intent", intent);
//       }

//       const json = await res.json();

//       setData(json?.data ?? null);
//     } finally {
//       setIsLoading(false);
//       setIsLoadingComments(false);
//     }
//   }, [productId, currentPage, sort, intent]);

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [intent, sort]);

//   return {
//     data,
//     isLoading,
//     isLoadingComments,
//     refetch,
//   };
// }

function useProductComments(
  productId,
  currentPage = 1,
  setCurrentPage,
  sort = "default",
  intent = null,
  append = false,
) {
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);
    setIsLoadingComments(true);

    try {
      const params = new URLSearchParams({
        page: currentPage,
        sort,
      });

      if (intent) {
        params.set("intent", intent);
      }

      const res = await fetch(
        `/api/product/${productId}/rate-review?${params.toString()}`,
      );

      const json = await res.json();
      const newData = json?.data ?? null;

      setData(newData);

      if (!append || currentPage === 1) {
        setComments(newData?.comments ?? []);
      } else {
        setComments((prev) => [...prev, ...(newData?.comments ?? [])]);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingComments(false);
    }
  }, [productId, currentPage, sort, intent, append]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setCurrentPage(1);
    setComments([]);
  }, [intent, sort]);

  return {
    commentsData: data,
    comments,
    isLoading,
    isLoadingComments,
    refetch,
  };
}

function useProductQuestions(
  productId,
  currentPage = 1,
  setCurrentPage,
  sort = "default",
  append = false,
) {
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);
    setIsLoadingQuestions(true);

    try {
      const params = new URLSearchParams({
        page: currentPage,
        sort,
      });

      const res = await fetch(
        `/api/product/${productId}/questions?${params.toString()}`,
      );

      const json = await res.json();
      const newData = json?.data ?? null;

      setData(newData);

      if (!append || currentPage === 1) {
        setQuestions(newData?.questions ?? []);
      } else {
        setQuestions((prev) => [...prev, ...(newData?.questions ?? [])]);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingQuestions(false);
    }
  }, [productId, currentPage, sort, append]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setCurrentPage(1);
    setQuestions([]);
  }, [sort]);

  return {
    questionsData: data,
    questions,
    isLoading,
    isLoadingQuestions,
    refetch,
  };
}

function useProductMediaComments(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const url = new URL(
        `/api/product/${productId}/comments-media`,
        window.location.origin,
      );

      const res = await fetch(url.toString());
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    isLoading,
    refetch,
  };
}

function useProductTabularRecommendation(productId, offset = 0) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTabularRecommendation, setIsLoadingTabularRecommendation] =
    useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);
    setIsLoadingTabularRecommendation(true);

    try {
      const res = await fetch(
        `/api/product/${productId}/tabular-recommendation/?offset=${offset}`,
      );
      const json = await res.json();
      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
      setIsLoadingTabularRecommendation(false);
    }
  }, [productId, offset]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, isLoadingTabularRecommendation, refetch };
}

function useProductRecommendation(productId, offset = 0) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(
        `/api/product/${productId}/recommendation/?offset=${offset}`,
      );
      const json = await res.json();
      setData(json?.data?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, isLoading, refetch };
}

function useProductFeedback(productId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);

    try {
      const res = await fetch(`/api/product/${productId}/feedback`);
      const json = await res.json();

      setData(json?.data ?? null);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    isLoading,
    refetch,
  };
}

function useAddIncredibleNotification() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ productId, send_sms, send_email, send_notification }) =>
      addIncredibleNotification({
        productId,
        send_sms,
        send_email,
        send_notification,
      }),
    {
      onSuccess: (_, variables) => {
        const { productId, send_sms, send_email, send_notification } =
          variables;

        queryClient.setQueryData(
          ["IncredibleNotification", String(productId)],
          {
            is_active: true,
            send_sms,
            send_email,
            send_notification,
          },
        );
      },
    },
  );
}

function useRemoveIncredibleNotification() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ productId }) => removeIncredibleNotification(productId),
    {
      onSuccess: (_, variables) => {
        const { productId } = variables;

        queryClient.setQueryData(
          ["IncredibleNotification", String(productId)],
          {
            is_active: false,
            send_sms: false,
            send_email: false,
            send_notification: false,
          },
        );
      },
    },
  );
}

function useGetIncredibleNotificationStatus({ productId }, options = {}) {
  return useQuery(
    ["IncredibleNotification", String(productId)],
    () => getIncredibleNotificationStatus({ productId }),
    {
      enabled: !!productId,
      ...options,
    },
  );
}

function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ productId }) =>
      addFavorite({
        productId,
      }),
    {
      onSuccess: (_, variables) => {
        const { productId } = variables;

        queryClient.setQueryData(["favorite", String(productId)], {
          is_favorite: true,
        });
      },
    },
  );
}

function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation(({ productId }) => removeFavorite(productId), {
    onSuccess: (_, variables) => {
      const { productId } = variables;

      queryClient.setQueryData(["favorite", String(productId)], {
        is_favorite: false,
      });
    },
  });
}

function useGetFavoriteStatus({ productId }, options = {}) {
  return useQuery(
    ["favorite", String(productId)],
    () => getFavoriteStatus({ productId }),
    {
      enabled: !!productId,
      ...options,
    },
  );
}

function useAddToRecentViewed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToRecentViewed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recent-viewed"],
      });
    },
  });
}

function useGetRecentViewed() {
  return useQuery({
    queryKey: ["recent-viewed"],
    queryFn: getRecentViewed,
  });
}

function usePostComment(productId) {
  const queryClient = useQueryClient();

  return useMutation((comment) => postComment(productId, comment), {
    onSuccess: () => {
      queryClient.invalidateQueries(["Comments", productId]);
    },
  });
}

function usePostQuestion(productId) {
  const queryClient = useQueryClient();

  return useMutation((question) => postQuestion(productId, question), {
    onSuccess: () => {
      queryClient.invalidateQueries(["Questions", productId]);
    },
  });
}

function usePostAnswer() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ productId, questionId, text, source }) =>
      postAnswer(questionId, { productId, text, source }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries([
          "Answer-Question",
          variables.questionId,
        ]);
      },
    },
  );
}

export {
  useGetProductDetails,
  useGetSuggestionProducts,
  useGetProductSizeGuide,
  useGetProductTrueToSize,
  useRecommendationProducts,
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
};

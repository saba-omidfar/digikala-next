import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getFeedbacks,
  postFeedback,
} from "@/services/axios/Requests/feedbackRequests";

export function useGetFeedback({ targetId, targetType }) {
  return useQuery(
    ["Feedback", targetType, targetId],
    () => getFeedbacks({ targetId, targetType }),
    {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      enabled: !!targetId && !!targetType,
    }
  );
}

export function usePostFeedback() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ targetId, targetType, type }) =>
      postFeedback({ targetId, targetType, type }),
    {
      onSuccess: (data, variables) => {
        // آپدیت cache خود Feedback
        queryClient.setQueryData(
          ["Feedback", variables.targetType, variables.targetId],
          data
        );

        // اگر کامنت‌ها رو cache کرده بودی
        if (variables.targetType === "comment") {
          const allCommentsKeys = queryClient
            .getQueryCache()
            .getAll()
            .filter((q) => q.queryKey[0] === "Comments");

          allCommentsKeys.forEach(({ queryKey }) => {
            const comments = queryClient.getQueryData(queryKey);
            if (!comments) return;

            queryClient.setQueryData(
              queryKey,
              comments.map((comment) =>
                comment.id === variables.targetId
                  ? {
                      ...comment,
                      Feedback: {
                        likes: data.likes,
                        dislikes: data.dislikes,
                      },
                      userLiked: data.userLiked,
                      userDisliked: data.userDisliked,
                    }
                  : comment
              )
            );
          });
        }
      },
      onError: (err) => {
        console.error("Error updating feedback:", err);
      },
    }
  );
}

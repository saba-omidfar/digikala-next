import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  postQuestion,
  postReactionAnswer,
  getReactionsAnswer,
  postAnswerQuestion,
} from "@/services/axios/Requests/questionRequests";

function usePostQuestion(productId) {
  const queryClient = useQueryClient();

  return useMutation((question) => postQuestion(productId, question), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(["Questions", productId]);
    },
    onError: (err) => {
      console.log("err:", err.message);
    },
  });
}

function useGetReactionsAnswer({ answerId }) {
  return useQuery(
    ["AnswerReactions", answerId],
    () => getReactionsAnswer({ answerId }),
    { enabled: !!answerId },
  );
}

function useReactionsAnswer() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ answerId, type }) => postReactionAnswer({ answerId, type }),
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(["AnswerReactions", variables.answerId], data);
      },
    },
  );
}

function usePostAnswerQuestion() {
  const queryClient = useQueryClient();

  return useMutation(postAnswerQuestion, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["Questions", variables.questionId]);
    },
    onError: (err) => {
      console.log("err:", err.message);
    },
  });
}

export {
  usePostQuestion,
  useGetReactionsAnswer,
  useReactionsAnswer,
  usePostAnswerQuestion,
};

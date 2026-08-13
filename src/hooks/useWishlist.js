import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createList,
  addProductToWishlist,
  getAllUserList,
} from "@/services/axios/Requests/wishlistRequests";

function useCreateList() {
  const queryClient = useQueryClient();

  return useMutation((newListData) => createList(newListData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["Wishlist"]);
    },
  });
}

function useAddProductToWishlist() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ wishlistId, productId }) =>
      addProductToWishlist({ wishlistId, productId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Wishlist"]);
      },
      onError: (error) => {
        return error.message;
      },
    }
  );
}

function useGetAllUserList() {
  return useQuery(["Wishlist"], () => getAllUserList());
}

export { useCreateList, useAddProductToWishlist, useGetAllUserList };

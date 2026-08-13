export function addProductToWishlistError(error) {
  if (!error.response) {
    return "ارتباط با سرور برقرار نشد!";
  }

  return error.response.data?.message;
}

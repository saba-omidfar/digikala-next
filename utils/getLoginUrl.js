export const getCurrentUrl = (pathname, searchParams) => {
  const query = searchParams?.toString();

  return query ? `${pathname}?${query}` : pathname;
};

export const getLoginUrl = (currentUrl = "/") => {
  return `/users/login?callbackUrl=${encodeURIComponent(currentUrl)}`;
};

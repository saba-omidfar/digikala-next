export const getScoreClass = (score) => {
  if (score >= 9) return "color-rating-4-5";
  if (score >= 8) return "color-rating-3-4";
  if (score >= 7) return "color-rating-2-3";
  if (score >= 5) return "color-rating-0-2";
  return "color-rating-0-1";
};

export const getScoreLabel = (label) => {
  if (label === "عالی") return "color-rating-4-5";
  if (label === "خیلی خوب" || label === "خوب") return "color-rating-2-3";
  // if (label === "خوب") return "color-rating-0-2";
  if (label === "خیلی ضعیف") return "color-hint-text-error";
  return "خیلی ضعیف";
};

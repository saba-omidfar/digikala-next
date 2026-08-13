export default function getTrueToSizeLabel(key) {
  switch (key) {
    case "tooBig":
      return {
        label: "خیلی بزرگ‌تر",
        colorIcon: "color-icon-warning",
        colorText: "text-hint-text-caution",
        icon: "thumbsDown",
      };

    case "big":
      return {
        label: "کمی بزرگ‌تر",
        colorIcon: "color-icon-low-emphasis",
        colorText: "text-neutral-500",
        icon: "questionExclamation",
      };

    case "fit":
      return {
        label: "دقیق و مناسب",
        colorIcon: "color-icon-rating-4-5",
        colorText: "text-rating-4-5",
        icon: "activeOutline",
      };

    case "small":
      return {
        label: "کمی کوچک‌تر",
        colorIcon: "color-icon-low-emphasis",
        colorText: "color-neutral-500",
        icon: "questionExclamation",
      };

    case "tooSmall":
      return {
        label: "خیلی کوچک‌تر",
        colorIcon: "color-icon-warning",
        colorText: "text-hint-text-caution",
        icon: "thumbsDown",
      };

    default:
      break;
  }
}

export default function persianToEnglish(value) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return value.replace(/[۰-۹]/g, (d) => persianNumbers.indexOf(d));
}

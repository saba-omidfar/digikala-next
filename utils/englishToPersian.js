export default function englishToPersian(value) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return value.toString().replace(/\d/g, (d) => persianNumbers[d]);
}

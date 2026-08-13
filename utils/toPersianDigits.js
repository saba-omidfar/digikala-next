export default function toPersianDigits(value) {
  return value?.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

export default function generate8DigitId() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

export default function shouldTruncate(text, limit) {
  if (!text) return false;
  return text.trim().length > limit;
}

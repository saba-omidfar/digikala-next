export default function getRelativeDate(date) {
  const now = new Date();
  const created = new Date(date);

  const diffTime = now - created;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "امروز";
  }

  if (diffDays === 1) {
    return "دیروز";
  }

  if (diffDays < 7) {
    return `${diffDays} روز پیش`;
  }

  return created.toLocaleDateString("fa-IR");
}

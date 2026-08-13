export default function formatPrice(value = "") {
  const numeric = value.replace(/\D/g, "");

  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

import ComparePage from "@/features/compare/pages/ComparePage";

export default async function Page({ params }) {
  const { productIds } = await params;

  return <ComparePage productIds={productIds} />;
}

import ProductPage from "@/features/product/pages/ProductPage";

export default async function Page({ params }) {
  const { productParams } = await params;
  const productId = productParams?.[0]?.replace("dkp-", "");

  return <ProductPage productId={productId} />;
}

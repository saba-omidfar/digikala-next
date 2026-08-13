import IncredibleTeasingPage from "@/features/incredible-offers-teasing/pages/IncredibleTeasingPage";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return <IncredibleTeasingPage categoryId={params?.category_id} />;
}

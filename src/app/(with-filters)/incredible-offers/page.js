import IncrediblePage from "@/features/incredible/pages/IncrediblePage";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return <IncrediblePage categoryId={params?.category_id} />;
}

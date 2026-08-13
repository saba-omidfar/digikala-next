import MainPage from "@/features/main/pages/MainPage";

export default async function Page({ params }) {
  const { categoryCode } = await params;

  return <MainPage categoryCode={categoryCode} />;
}

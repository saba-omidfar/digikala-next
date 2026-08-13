import LandingPage from "@/features/landing/pages/LandingPage";

export default async function Page({ params }) {
  const { id } = await params;

  return <LandingPage id={id} />;
}

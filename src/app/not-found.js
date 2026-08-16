import { Suspense } from "react";

import NotFoundPage from "@/features/not-found/pages/NotFoundPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <NotFoundPage />
    </Suspense>
  );
}

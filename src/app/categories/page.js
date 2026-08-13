import { Suspense } from "react";

import CategoriesPage from "@/features/categories/pages/CategoriesPage";

export default function CategoryPage() {
  return (
    <Suspense fallback={null}>
      <CategoriesPage />
    </Suspense>
  );
}

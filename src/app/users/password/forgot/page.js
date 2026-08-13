import { Suspense } from "react";

import PasswordPage from "@/features/users/pages/password/PasswordPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PasswordPage />
    </Suspense>
  );
}

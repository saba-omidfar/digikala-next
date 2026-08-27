import { Suspense } from "react";

import ParentModal from "@/components/ui/modals/parentModal/ParentModal";

export default function SearchLayout({ children }) {
  return (
    <Suspense fallback={null}>
      <ParentModal scope="listing" />
      {children}
    </Suspense>
  );
}

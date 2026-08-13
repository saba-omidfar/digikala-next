import { Suspense } from "react";

import { ListingProvider } from "@/contexts/ListingContext";
import ParentModal from "@/components/ui/modals/parentModal/ParentModal";

export default function SearchLayout({ children }) {
  return (
    <Suspense fallback={null}>
      <ListingProvider>
        <ParentModal scope="listing" />
        {children}
      </ListingProvider>
    </Suspense>
  );
}

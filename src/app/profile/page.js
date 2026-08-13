import { Suspense } from "react";

import Header from "@/components/layout/header/desktop/Header";
import Footer from "@/components/layout/footer/desktop/Footer";

function page() {
  return (
    <Suspense fallback={null}>
      <Header />
      <Footer />
    </Suspense>
  );
}
export default page;

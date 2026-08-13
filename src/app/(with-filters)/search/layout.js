"use client";

import { useParams } from "next/navigation";

import Header from "@/components/layout/header/desktop/Header";
import MobileStickyHeader from "@/components/layout/header/mobile/mobileStickyHeader/MobileStickyHeader";
import SearchStickyInput from "@/components/layout/header/sections/searchStickyInput/SearchStickyInput";
import Footer from "@/components/layout/footer/desktop/Footer";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useListing } from "@/contexts/ListingContext";

export default function SearchLayout({ children }) {
  const { isSmallScreen, isClientReady } = useScreenStatus();
  const { categoryCode } = useParams();

  const { data } = useListing();

  if (!isClientReady) return null;

  return isSmallScreen ? (
    <div className="d-flex flex-column flex-grow-1">
      {categoryCode ? (
        <MobileStickyHeader title={data?.category?.title_fa} />
      ) : (
        <SearchStickyInput />
      )}
      {children}
      <MenuMobile />
    </div>
  ) : (
    <div className="h-100 d-flex flex-column bg-white align-items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

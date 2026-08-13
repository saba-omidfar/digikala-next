"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import SearchStickyInput from "@/components/layout/header/sections/searchStickyInput/SearchStickyInput";
import CategoriesContent from "@/features/categories/sections/categoriesContent/CategoriesContent";
import MenuMobile from "@/components/layout/footer/mobile/menuMobile/MenuMobile";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function CategoriesPage() {
  const router = useRouter();
  const { isSmallScreen } = useScreenStatus();

  useEffect(() => {
    if (!isSmallScreen) {
      router.replace("/");
    }
  }, [isSmallScreen, router]);

  return (
    <div className="d-flex flex-column h-100 bg-white">
      <div className="d-flex flex-column flex-grow-1">
        <SearchStickyInput />
        <CategoriesContent />
        <MenuMobile activeMenu="دسته‌بندی" />
      </div>
    </div>
  );
}

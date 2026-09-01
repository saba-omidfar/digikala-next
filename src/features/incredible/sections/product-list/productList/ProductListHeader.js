"use client";

import { useParams } from "next/navigation";

import MobileBreadcrumb from "@/features/incredible/sections/product-list/mobileBreadcrumb/MobileBreadcrumb";
import Breadcrumb from "@/features/incredible/sections/product-list/breadcrumb/Breadcrumb";
import Brand from "@/features/incredible/sections/product-list/brand/Brand";
import Advertisement from "@/features/incredible/sections/product-list/advertisement/Advertisement";
import Categories from "@/features/incredible/sections/product-list/categories/Categories";
import SelectCategory from "@/features/search/sections/selectCategory/SelectCategory";

import useScreenStatus from "@/hooks/useScreenStatus";

import { useListing } from "@/contexts/ListingContext";

export default function ProductListHeader({
  desktopNavClassname,
  mobileNavClassname,
}) {
  const { isSmallScreen } = useScreenStatus();
  const { categoryCode } = useParams();
  const { data, setCategoryId } = useListing();

  return (
    <>
      {isSmallScreen ? (
        <MobileBreadcrumb mobileNavClassname={mobileNavClassname} />
      ) : (
        <Breadcrumb desktopNavClassname={desktopNavClassname} />
      )}

      <Brand />
      <Advertisement advertisement={data?.advertisement} />

      <Categories />

      {isSmallScreen && !categoryCode && (
        <SelectCategory setCategoryId={setCategoryId} />
      )}
    </>
  );
}

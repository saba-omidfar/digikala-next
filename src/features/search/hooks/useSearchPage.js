"use client";

import { useSearchParams, useParams } from "next/navigation";

import { useListing } from "@/contexts/ListingContext";
import { useAutocomplete } from "@/hooks/useAutocomplete";

export default function useSearchPage() {
  const { categoryCode, promotionId, sellerCode } = useParams();

  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("q");
  const categoryCodeQuery = searchParams.get("categoryCode");

  const { data, isLoading, showFiltersDetailsModal } = useListing();
  const { data: autoCompleteData } = useAutocomplete(searchTerm);

  return {
    sellerCode,
    categoryCode,
    promotionId,
    searchTerm,
    categoryCodeQuery,
    autoCompleteData,
    data,
    isLoading,
    showFiltersDetailsModal,
  };
}

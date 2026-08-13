"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

import buildCategoryTree from "@/utils/buildCategoryTree";
import useScreenStatus from "@/hooks/useScreenStatus";
import { useModal } from "@/contexts/modalContext";

export default function useCategoryNavigation({
  categoryTree,
  categoryCode,
  searchCategoryId,
  categoryOptions,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { closeModal } = useModal();
  const { isSmallScreen } = useScreenStatus();

  const categoryMap = useMemo(() => {
    const map = new Map();

    categoryTree?.forEach((item) => {
      map.set(item.category.id, item);
    });

    return map;
  }, [categoryTree]);

  const codeMap = useMemo(() => {
    const map = new Map();

    categoryTree?.forEach((item) => {
      map.set(item.category.code, item);
    });

    return map;
  }, [categoryTree]);

  const activeCategory = useMemo(() => {
    if (!categoryCode) return null;

    return codeMap.get(categoryCode)?.category ?? null;
  }, [categoryCode, codeMap]);

  const activeCategoryHierarchy = useMemo(() => {
    const hierarchy = {};

    const id = activeCategory?.id ?? searchCategoryId;

    if (!id) return hierarchy;

    let current = categoryMap.get(id);

    while (current) {
      hierarchy[current.category.id] = {
        ...current.category,
        categoryParentId: current.parent_id,
        categoryChilds: [],
      };

      if (!current.parent_id) break;

      current = categoryMap.get(current.parent_id);
    }

    return hierarchy;
  }, [activeCategory, searchCategoryId, categoryMap]);

  const breadcrumb = useMemo(() => {
    const id = activeCategory?.id ?? searchCategoryId;

    if (!id) return [];

    const items = [];

    let current = categoryMap.get(id);

    while (current) {
      items.unshift(current.category);

      if (!current.parent_id) break;

      current = categoryMap.get(current.parent_id);
    }

    if (!activeCategory) {
      return items.length ? [items[0]] : [];
    }

    return items.map((item) => ({
      ...item,
      isExpanded: true,
    }));
  }, [activeCategory, searchCategoryId, categoryMap]);

  const categories = useMemo(() => {
    if (!activeCategory) return [];

    const tree = buildCategoryTree({
      categoryTree,
      currentNode: codeMap.get(activeCategory.code),
      options: categoryOptions,
    });

    return tree.map((item) => ({
      ...item,
      isExpanded: false,
    }));
  }, [activeCategory, categoryOptions, categoryTree, codeMap]);

  const isCategoryPage = Boolean(activeCategory);

  const getParent = (categoryId) => {
    const parentId = categoryMap.get(categoryId)?.parent_id;

    if (!parentId) return null;

    return activeCategoryHierarchy[parentId] ?? null;
  };

  const navigateToCategory = (category) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    const parent = getParent(category.id);

    if (parent) {
      nextParams.set("categoryCode", parent.code);
    } else {
      nextParams.delete("categoryCode");
    }

    nextParams.set("categoryId", category.id);

    if (isSmallScreen) closeModal("filter");

    router.push(`/search/${category.code}?${nextParams.toString()}`);
  };

  return {
    activeCategory,
    activeCategoryHierarchy,
    breadcrumb,
    categories,
    isCategoryPage,
    getParent,
    navigateToCategory,
  };
}

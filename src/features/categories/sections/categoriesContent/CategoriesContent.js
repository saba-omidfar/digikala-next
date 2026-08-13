"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

import MainMenuItem from "@/features/categories/sections/mainMenuItem/MainMenuItem";
import MegamenuContent from "@/features/categories/sections/megamenuContent/MegamenuContent";

import { useGetMegamenu } from "@/hooks/useMegamenu";

import styles from "./categoriesContent.module.css";

function CategoriesContent() {
  const contentRef = useRef(null);

  const [activeId, setActiveId] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const { data, isLoading: categoriesIsLoading } = useGetMegamenu();

  const categoriesMap = useMemo(() => {
    if (!data?.length) return new Map();

    return new Map(data.map((category) => [category.id, category]));
  }, [data]);

  const activeCategory = useMemo(() => {
    return categoriesMap.get(activeId);
  }, [categoriesMap, activeId]);

  useEffect(() => {
    if (!data?.length) return;

    setActiveId((prev) => prev ?? data[0].id);
  }, [data]);

  /**
   * Initial accordion state
   */
  useEffect(() => {
    if (!data?.length) return;

    const initialExpanded = {};

    data.forEach((category) => {
      const firstSubCategory = category.children?.[0];

      if (firstSubCategory?.id) {
        initialExpanded[firstSubCategory.id] = true;
      }
    });

    setExpandedItems(initialExpanded);
  }, [data]);

  useEffect(() => {
    contentRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [activeId]);

  const handleCategorySelect = useCallback((id) => {
    setActiveId((prev) => (prev === id ? prev : id));
  }, []);

  const handleAccordionToggle = useCallback((id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  if (categoriesIsLoading) {
    return (
      <div className={styles.mega_menu}>
        <div className="overlay" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className="d-flex flex-column flex-grow-1 bg-white">
        <div className={styles.content}>
          <div className={styles.main_menu_items_container}>
            {data?.map((category) => (
              <MainMenuItem
                key={category.id}
                category={category}
                isActive={category.id === activeId}
                onClick={() => handleCategorySelect(category.id)}
              />
            ))}
          </div>

          <div ref={contentRef} className="flex-grow-1 overflow-auto">
            <MegamenuContent
              activeCategory={activeCategory}
              expandedItems={expandedItems}
              onToggleAccordion={handleAccordionToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CategoriesContent);

"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";

import ProductCard from "@/features/compare/sections/productCard/ProductCard";
import AttributeGroup from "@/features/compare/sections/attributeGroup/AttributeGroup";
import SelectProductCard from "@/features/compare/sections/selectProductCard/SelectProductCard";

import { useCompare } from "@/hooks/useCompare";

import styles from "./compareContent.module.css";

export default function CompareContent({
  productIds,
  maxLength,
  borderClassName,
  isSmallScreen,
}) {
  const router = useRouter();

  const { data, isLoading } = useCompare(productIds);

  const handleRemoveProduct = useCallback(
    (idToRemove) => {
      const newIds = productIds.filter((id) => id !== `dkp-${idToRemove}`);

      router.push(newIds.length ? `/compare/${newIds.join("/")}` : "/compare");
    },
    [productIds, router],
  );

  const normalizedGroups = useMemo(() => {
    const groupsMap = new Map();

    const products = data?.compare_products ?? [];

    products.forEach((product, productIndex) => {
      product.attribute_groups?.forEach((group) => {
        if (!groupsMap.has(group.id)) {
          groupsMap.set(group.id, {
            id: group.id,
            title: group.title,
            attributes: new Map(),
          });
        }

        const currentGroup = groupsMap.get(group.id);

        group.attributes?.forEach((attr) => {
          if (!currentGroup.attributes.has(attr.id)) {
            currentGroup.attributes.set(attr.id, {
              id: attr.id,
              title: attr.title,
              values: Array(products.length).fill("-"),
            });
          }

          currentGroup.attributes.get(attr.id).values[productIndex] =
            attr.values?.join(" ") || "-";
        });
      });
    });

    return [...groupsMap.values()].map((group) => ({
      ...group,
      attributes: [...group.attributes.values()],
    }));
  }, [data?.compare_products]);

  const gridColumns = useMemo(() => {
    const columns =
      (data?.compare_products?.length ?? 0) +
      (productIds.length < maxLength ? 1 : 0);

    return `repeat(${columns}, minmax(0, 1fr))`;
  }, [data?.compare_products?.length, productIds.length, maxLength]);

  if (isSmallScreen && !data && isLoading) return null;

  return (
    <>
      <div className={styles.compare_container}>
        <div
          className={styles.compare}
          style={{
            gridTemplateColumns: gridColumns,
          }}
        >
          {/* Product Card */}
          {data?.compare_products?.map((item) => (
            <ProductCard
              key={item?.product?.id}
              product={item}
              canRemove={data?.compare_products?.length > 1}
              onRemove={handleRemoveProduct}
            />
          ))}

          {/* Select Produt Btn */}
          {productIds.length < maxLength && (
            <SelectProductCard productIds={productIds} />
          )}
        </div>
      </div>

      <div className={styles.attribute_groups_container}>
        {normalizedGroups.map((group) => (
          <AttributeGroup
            key={group.id}
            group={group}
            gridColumns={gridColumns}
            borderClassName={borderClassName}
          />
        ))}
      </div>
    </>
  );
}

"use client";

import { useListing } from "@/contexts/ListingContext";

import styles from "./productList.module.css";

export default function ProductListSeo() {
  const { data } = useListing();

  if (!data?.seo?.content) return null;

  return (
    <article aria-hidden="true" className={styles.seo}>
      <div
        dir="rtl"
        dangerouslySetInnerHTML={{
          __html: data?.seo?.content || "",
        }}
      />
    </article>
  );
}

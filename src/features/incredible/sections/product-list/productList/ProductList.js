import ProductListHeader from "@/features/incredible/sections/product-list/productList/ProductListHeader";
import ProductListBanners from "@/features/incredible/sections/product-list/productList/ProductListBanners";
import ProductListProducts from "@/features/incredible/sections/product-list/productList/ProductListProducts";
import ProductListSeo from "@/features/incredible/sections/product-list/productList/ProductListSeo";
import MobileSort from "../mobileSort/MobileSort";

import Sort from "@/features/incredible/sections/product-list/sort/Sort";
import NotFoundMessage from "@/features/incredible/sections/product-list/notFoundMessage/NotFoundMessage";
import Pagination from "@/features/product/sections/pagination/Pagination";
import ProductListSidebar from "@/features/incredible/sections/product-list/productListSidebar/ProductListSidebar";

import { useProductList } from "@/features/search/hooks/useProductList";

import styles from "./productList.module.css";
import "@/styles/productList.css";

export default function ProductList({
  isIncrediblePage,
  isIncredibleTeasing,
  activeFilter,
  setActiveFilter,
  desktopNavClassname,
  mobileNavClassname,
}) {
  const {
    filters,
    products,
    banners,
    totalItems,
    page,
    setPage,
    isLoading,
    isFetchingMore,
    isAutoFetchEnabled,
    goToPage,
    loadMoreRef,
  } = useProductList();

  return (
    <>
      <ProductListHeader
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        desktopNavClassname={desktopNavClassname}
        mobileNavClassname={mobileNavClassname}
      />

      <div id="products-container" className={styles.productList_container}>
        <section className="w-100 flex-grow-1 position-relative">
          {isLoading ? (
            <div className={styles.left_loading}></div>
          ) : (
            <>
              {filters && (
                <>
                  <MobileSort
                    isIncrediblePage={isIncrediblePage}
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                  />
                  <Sort />
                </>
              )}

              <ProductListBanners banners={banners} />

              <ProductListProducts
                products={products}
                filters={filters}
                totalItems={totalItems}
                isFetchingMore={isFetchingMore}
                loadMoreRef={loadMoreRef}
                isIncredibleTeasing={isIncredibleTeasing}
              />

              {!isLoading && totalItems === 0 && <NotFoundMessage />}

              {!isAutoFetchEnabled && (
                <Pagination
                  totalItems={totalItems}
                  currentPage={page}
                  setCurrentPage={setPage}
                  onPageChange={goToPage}
                />
              )}
            </>
          )}
        </section>

        <ProductListSidebar />
      </div>

      <ProductListSeo />
    </>
  );
}

"use client";

import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";

import { useGetWishlistDetails } from "@/features/profile/hooks/useLists";
import toPersianDigits from "@/utils/toPersianDigits";

import CreateListModal from "@/features/profile/modals/createListModal/CreateListModal";

import WishlistProduct from "./wishlistProduct/WishlistProduct";
import LoadingProduct from "../loadingProduct/LoadingProduct";

import { useModal } from "@/contexts/modalContext";

import styles from "./wishlistDetails.module.css";

export default function WishlistDetails({ wishlistCode }) {
  const router = useRouter();
  const { openModal } = useModal();

  const { data, isLoading, sort, setSort, refetch } =
    useGetWishlistDetails(wishlistCode);

  console.log("DATA ->", data);

  return (
    <div className={styles.profile_content_container}>
      <div className={styles.profile_content}>
        <div className={styles.profile_header_container}>
          <div className="d-flex align-items-center flex-grow-1">
            <div
              className={styles.arrow_icon_container}
              aria-hidden="false"
              onClick={() => router.push("/profile/lists/?activeTab=public")}
            >
              <svg className={styles.arrow_icon}>
                <use href="#arrowRight"></use>
              </svg>
            </div>
            <p className={styles.wishlist_title}>
              <span className="position-relative">
                {data?.public_list?.title}
              </span>
            </p>
            <div
              onClick={() =>
                openModal(
                  <CreateListModal
                    isEdit={true}
                    wishlist={data?.public_list}
                  />,
                  {
                    name: "create-list",
                    className: "modal__create_list rounded-medium",
                    size: "md",
                  },
                )
              }
            >
              <div className={styles.header_btn_container}>
                <div
                  className={styles.header_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.header_icon}>
                    <use href="#edit"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="d-flex flex-wrap">
            {[...Array(6)].map((_, index) => (
              <LoadingProduct key={index} />
            ))}
          </div>
        ) : (
          <>
            {data?.products?.length ? (
              <div id="plpLayoutContainer" className={styles.wishlist_list}>
                <section className="w-100 flex-grow-1 position-relative">
                  <div>
                    <div className={styles.wishlist_list_header}>
                      <div className={styles.wishlist_list_header_title}>
                        <div
                          className={styles.sort_icon_container}
                          aria-hidden="false"
                        >
                          <svg className={styles.sort_icon}>
                            <use href="#sort"></use>
                          </svg>
                        </div>
                        مرتب سازی:
                      </div>
                      <div className={styles.sort_options}>
                        {data?.sort_options?.map((sortOption) => (
                          <div
                            key={sortOption.id}
                            data-cro-id="plp-sort-option"
                            className={`${styles.sort_option} ${
                              sort === sortOption.id
                                ? styles.sort_option_active
                                : ""
                            }`}
                            onClick={() => setSort(sortOption.id)}
                          >
                            {sortOption.title_fa}
                          </div>
                        ))}
                      </div>
                      <div className={styles.wishlist_list_count}>
                        {toPersianDigits(data?.products?.length)} کالا
                      </div>
                    </div>
                  </div>
                  <div className="d-flex h-100 flex-column">
                    <div>
                      <div className="d-flex flex-wrap">
                        {isLoading
                          ? [...Array(6)].map((_, index) => (
                              <LoadingProduct key={index} />
                            ))
                          : data?.products?.map((product) => (
                              <WishlistProduct
                                key={product.id}
                                product={product}
                                refetch={refetch}
                                list={data?.public_list}
                              />
                            ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div className={styles.wishlist_empty}>
                <div
                  role="img"
                  aria-hidden="false"
                  aria-label="این لیست خالی است."
                  className={styles.wishlist_empty_img_container}
                >
                  <img
                    className={styles.wishlist_empty_img}
                    alt="این لیست خالی است."
                    title=""
                    src="https://www.digikala.com/statics/img/svg/wish-list.svg"
                  />
                </div>
                <div className={styles.wishlist_empty_title}>
                  این لیست خالی است.
                </div>
                <Link
                  className={styles.create_list_link}
                  href="/profile/lists/?activeTab=public"
                >
                  <span>
                    <p>لیست عمومی خودتان را بسازید</p>
                  </span>
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.chevron_icon}>
                      <use href="#chevronLeft"></use>
                    </svg>
                  </div>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

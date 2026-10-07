import Link from "next/link";

import CreateListModal from "@/features/profile/modals/createListModal/CreateListModal";
import ShareProductModal from "@/features/product/modals/shareProductModal/ShareProductModal";
import ListLoading from "@/features/profile/sections/listLoading/ListLoading";
import ListItem from "./listItem/ListItem";

import { useGetPublicList } from "@/features/profile/hooks/useLists";
import { useModal } from "@/contexts/modalContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./publicList.module.css";

const listSuggestions = [
  {
    title: "خرید روزانه",
    subtitle: "خریدهای روزانه و موردنیاز خانه را یک‌جا ثبت کنید.",
    img: "https://www.digikala.com/statics/img/svg/wish-list-home.svg",
  },
  {
    title: "پیشنهاد به دوستان",
    subtitle: "کالاهای موردنظرتان را به دوستان پیشنهاد کنید.",
    img: "https://www.digikala.com/statics/img/svg/wish-list-home.svg",
  },
  {
    title: "هدیه‌ها",
    subtitle: "برای هدیه خریدن، از قبل ایده‌هایتان را جمع کنید.",
    img: "https://www.digikala.com/statics/img/svg/wish-list-birthday.svg",
  },
  {
    title: "آرزوها",
    subtitle: "کالاهایی که دوست دارید در آینده داشته باشید.",
    img: "https://www.digikala.com/statics/img/svg/wish-list-birth.svg",
  },
];

export default function PublicList() {
  const { openModal } = useModal();
  const { data, isLoading } = useGetPublicList();

  if (isLoading) return null;

  return (
    <li className={styles.create_public_list_container}>
      <div
        className={`${data?.public_list?.length ? styles.create_public_with_list : styles.create_public_list}`}
      >
        <div className={styles.create_public_list_header}>
          <p className={styles.create_public_list_title}>
            لیستی از کالاهای دلخواه بسازید!
          </p>
          <button
            className={styles.create_public_list_btn}
            data-cro-id="profile-create-list"
            onClick={() =>
              openModal(<CreateListModal />, {
                name: "create-list",
                className: "modal__create_list rounded-medium",
                size: "md",
              })
            }
          >
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              <div
                className={styles.create_public_list_icon_container}
                aria-hidden="false"
              >
                <svg className={styles.create_public_list_icon}>
                  <use href="#addSimple"></use>
                </svg>
              </div>
              لیست جدید
            </div>
          </button>
        </div>

        {data?.public_list?.length ? (
          <div className={styles.public_list_container}>
            {isLoading ? (
              <ListLoading />
            ) : (
              <>
                {data?.public_list?.length > 0
                  ? data?.public_list?.map((list) => (
                      <Link
                        className={styles.list_link}
                        href={`/profile/wishlist/${list?.code}/details/`}
                        key={list.code}
                      >
                        {!list?.product_images?.length ? (
                          <div className={styles.empty_list_card}>
                            <div
                              role="img"
                              aria-hidden="false"
                              aria-label="Empty list"
                              className={styles.empty_list_img_container}
                            >
                              <img
                                className={styles.empty_list_img}
                                alt="Empty list"
                                title=""
                                src="https://www.digikala.com/statics/img/svg/wish-list.svg"
                              />
                            </div>
                            این لیست خالی است!
                          </div>
                        ) : (
                          <div className={styles.list_card}>
                            {list?.product_images?.map((image, index) => (
                              <ListItem key={index} image={image} />
                            ))}
                          </div>
                        )}

                        <div className={styles.list_card_details}>
                          <div className={styles.list_card_details_header}>
                            <div
                              className={styles.list_card_details_description}
                            >
                              {list?.title}
                            </div>
                            <div
                              className="d-flex"
                              aria-hidden="false"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();

                                openModal(<ShareProductModal title="لیست" />, {
                                  name: "share-product",
                                  className:
                                    "modal__share_product rounded-medium",
                                });
                              }}
                            >
                              <svg className={styles.share_icon}>
                                <use href="#share"></use>
                              </svg>
                            </div>
                          </div>
                          <div className={styles.list_card_details_content}>
                            <div
                              className={styles.list_card_details_count}
                            ></div>
                            <div>{toPersianDigits(list?.size_list)} کالا</div>
                          </div>
                        </div>
                      </Link>
                    ))
                  : ""}
              </>
            )}
          </div>
        ) : (
          <div className={styles.list_empty_container}>
            <div className={styles.list_empty}>
              <div
                role="img"
                aria-hidden="false"
                aria-label="هنوز هیچ لیستی نساخته‌اید!"
                className={styles.list_empty_img_container}
              >
                <img
                  className={styles.list_empty_img}
                  alt="هنوز هیچ لیستی نساخته‌اید!"
                  title=""
                  src="https://www.digikala.com/statics/img/svg/wish-list.svg"
                />
              </div>
            </div>
            <div className={styles.list_empty_title}>
              هنوز هیچ لیستی نساخته‌اید!
            </div>
          </div>
        )}
      </div>
      <div className={styles.list_suggestions_container}>
        <span className={styles.list_suggestions_header}>
          می‌توانید از لیست‌های زیر اﺳﺘﻔﺎده ﮐﻨﯿﺪ یا لیست خلاقانه خود را بسازید.
        </span>
        <div className={styles.list_suggestions}>
          {listSuggestions?.map((list) => (
            <div key={list.title} className={styles.list_suggestion_item}>
              <div
                role="img"
                aria-hidden="false"
                aria-label={list.title}
                className={styles.list_suggestion_item_img_container}
              >
                <img
                  className={styles.list_suggestion_item_img}
                  alt={list.title}
                  title=""
                  src={list.img}
                />
              </div>
              <span className={styles.list_suggestion_item_title}>
                {list.title}
              </span>
              <span className={styles.list_suggestion_item_subtitle}>
                {list.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}

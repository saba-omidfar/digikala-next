import Link from "next/link";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./giftModal.module.css";

function GiftModal() {
  const { closeModal } = useModal();
  const { activeVariant } = useProductContext();

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.header_title_text}>
                <span className="position-relative">لیست هدیه‌ها</span>
              </p>
            </div>
          </div>
          <div className="flex-grow-1 text-h5"></div>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal()}
          >
            <svg
              data-test-id="close-modal-icon-button"
              className={styles.close_icon}
            >
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content}>
          {activeVariant?.gifts?.map((gift) => (
            <Link
              key={gift.id}
              className={styles.br_list_vertical_no_padding_200}
              href={gift ? gift?.url?.uri : "#"}
            >
              <div className={styles.product_card_container}>
                <div
                  aria-hidden="false"
                  aria-label={gift?.title_fa}
                  className={styles.product_img_container}
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={gift?.images?.main?.webp_url?.[0]}
                    />
                    <source
                      type="image/jpeg"
                      srcSet={gift?.images?.main?.url?.[0]}
                    />
                    <img
                      className={styles.product_img}
                      src={gift?.images?.main?.url?.[0]}
                      alt={gift?.title_fa}
                      title=""
                    />
                  </picture>
                </div>
                <div className="d-flex flex-column justify-content-between flex-grow-1">
                  <p className={styles.product_title}>{gift?.title_fa}</p>
                  <div className="d-flex align-items-center flex-row-reverse">
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.rate_icon}>
                        <use href="#starFill"></use>
                      </svg>
                    </div>
                    <span className={styles.rate_text}>
                      {" "}
                      {toPersianDigits(
                        Math.round((gift?.rating?.rate / 100) * 5 * 10) / 10,
                      )}
                    </span>
                    <span className={styles.rate_count}>
                      ({toPersianDigits(gift?.rating?.count)})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GiftModal;

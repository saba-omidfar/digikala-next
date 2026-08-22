import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";

import { usePopper } from "react-popper";

import ShareProductModal from "@/features/product/modals/shareProductModal/ShareProductModal";
import AmazingNotifModal from "@/features/product/modals/amazingNotifModal/AmazingNotifModal";
import AddToListModal from "@/features/product/modals/addToListModal/AddToListModal";

import PricingPromotion from "@/features/product/sections/productDetails/PricingPromotion";
import Gallery from "@/features/product/sections/gallery/Gallery";
import GalleryModal from "@/features/product/modals/galleryModal/GalleryModal";
import ProductFeedbackDesktopModal from "@/features/product/modals/productFeedbackDesktopModal/ProductFeedbackDesktopModal";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./infoSectionRight.module.css";

function InfoSectionRight() {
  const router = useRouter();
  const { openModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const [showTimer, setShowTimer] = useState(true);

  const [tooltipKey, setTooltipKey] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { user } = useUserContext();
  const {
    productDetails,
    isSelectedColor,
    selectedThemes,
    activeVariant,
    removeIncredibleNotification,
    incredibleStatus,
    isLoadingIncredibleStatus,
    addFavorite,
    isLoadingAddFavorite,
    removeFavorite,
    favotiteStatus,
    isLoadingFavoriteStatus,
  } = useProductContext();

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "left",

      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: 8,
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top"],
          },
        },
      ],
    },
  );

  const notifeMeHandler = () => {
    if (isLoadingIncredibleStatus) return;

    if (!user) {
      router.push("/users/login");
      return;
    }

    if (!incredibleStatus?.is_active) {
      return openModal(<AmazingNotifModal productId={productDetails?.id} />, {
        name: "amazing-notification",
        className: "rounded-medium",
      });
    }

    removeIncredibleNotification(
      {
        productId: productDetails?.id,
      },
      {
        onSuccess: () => {
          showSnackbar("حذف اطلاع‌رسانی با موفقیت انجام شد");
        },
      },
    );
  };

  const favoriteHandler = () => {
    if (isLoadingFavoriteStatus || isLoadingAddFavorite) return;

    if (!user) {
      router.push("/users/login");
      return;
    }

    if (favotiteStatus?.is_favorite) {
      removeFavorite({
        productId: productDetails?.id,
      });
    } else {
      addFavorite(
        {
          productId: productDetails?.id,
        },
        {
          onSuccess: ({ success }) => {
            if (success) {
              showSnackbar("کالا به علاقه‌مندی‌ها اضافه شد");
            }
          },
        },
      );
    }
  };

  const goToComparePage = () => {
    router.push(`/compare/dkp-${productDetails?.id}`);
  };

  const selectedColorTheme = selectedThemes?.find(
    (theme) => theme.themeType === "colored",
  );

  const mainImage = productDetails?.colors
    ?.find((color) => color.id === selectedColorTheme?.themeId)
    ?.images?.find((img) => img.is_main);

  return (
    <>
      <div className={styles.infoSection_right}>
        <PricingPromotion
          isIncredible={activeVariant?.price?.is_incredible}
          isPromotion={activeVariant?.price?.is_promotion}
          type="incredible"
          variant={activeVariant}
          showTimer={showTimer}
          onFinishTimer={() => setShowTimer(false)}
        />

        <div className="d-block align-items-center">
          <div className="d-flex position-relative">
            <div className={styles.productDetails_img_actions}>
              <div
                className={styles.productDetails_img_actions_item}
                onClick={favoriteHandler}
              >
                <div
                  ref={tooltipKey === "favorite" ? setReferenceElement : null}
                  className={styles.productDetails_img_actions_text}
                  onMouseEnter={() => setTooltipKey("favorite")}
                  onMouseLeave={() => setTooltipKey(null)}
                >
                  <div className="d-flex" aria-hidden="false">
                    <svg
                      className={styles.favorite_icon}
                      style={{
                        fill: favotiteStatus?.is_favorite
                          ? "#ef4056"
                          : "#424750",
                      }}
                    >
                      <use
                        href={
                          favotiteStatus?.is_favorite
                            ? "#favoriteOn"
                            : "#favoriteOff"
                        }
                      ></use>
                    </svg>
                  </div>
                </div>
                {tooltipKey === "favorite" && (
                  <div
                    ref={setPopperElement}
                    style={popperStyles.popper}
                    {...attributes.popper}
                    className={`${tooltipKey ? "tooltip__active" : "tooltip__inactive"} actions_tooltip`}
                  >
                    اضافه به علاقه‌مندی‌
                  </div>
                )}
              </div>
              <div
                className={styles.productDetails_img_actions_item}
                onClick={() =>
                  openModal(<ShareProductModal />, {
                    className: "rounded-medium",
                  })
                }
              >
                <div
                  ref={tooltipKey === "share" ? setReferenceElement : null}
                  className={styles.productDetails_img_actions_text}
                  onMouseEnter={() => setTooltipKey("share")}
                  onMouseLeave={() => setTooltipKey(null)}
                >
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.share_icon}>
                      <use href="#share"></use>
                    </svg>
                  </div>
                </div>
                {tooltipKey === "share" && (
                  <div
                    ref={setPopperElement}
                    style={popperStyles.popper}
                    {...attributes.popper}
                    className={`${tooltipKey ? "tooltip__active" : "tooltip__inactive"} actions_tooltip`}
                  >
                    به اشتراک‌گذاری کالا
                  </div>
                )}
              </div>
              <div
                className={styles.productDetails_img_actions_item}
                onClick={notifeMeHandler}
              >
                <div
                  ref={
                    tooltipKey === "notification" ? setReferenceElement : null
                  }
                  className={styles.productDetails_img_actions_text}
                  onMouseEnter={() => setTooltipKey("notification")}
                  onMouseLeave={() => setTooltipKey(null)}
                >
                  <div className="d-flex" aria-hidden="false">
                    <svg
                      className={styles.notification_icon}
                      style={{
                        fill: incredibleStatus?.is_active
                          ? "#ef4056"
                          : "#424750",
                      }}
                    >
                      <use href="#notificationActiveOutline"></use>
                    </svg>
                  </div>
                </div>
                {tooltipKey === "notification" && (
                  <div
                    ref={setPopperElement}
                    style={popperStyles.popper}
                    {...attributes.popper}
                    className={`${tooltipKey ? "tooltip__active" : "tooltip__inactive"} actions_tooltip`}
                  >
                    اطلاع‌رسانی شگفت‌انگیز
                  </div>
                )}
              </div>

              {/* COMPARE */}
              <div
                className={styles.productDetails_img_actions_item}
                onClick={goToComparePage}
              >
                <div
                  ref={tooltipKey === "compare" ? setReferenceElement : null}
                  className={styles.productDetails_img_actions_text}
                  onMouseEnter={() => setTooltipKey("compare")}
                  onMouseLeave={() => setTooltipKey(null)}
                >
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.compare_icon}>
                      <use href="#compare"></use>
                    </svg>
                  </div>
                </div>
                {tooltipKey === "compare" && (
                  <div
                    ref={setPopperElement}
                    style={popperStyles.popper}
                    {...attributes.popper}
                    className={`${tooltipKey ? "tooltip__active" : "tooltip__inactive"} compare_tooltip`}
                  >
                    مقایسه کالا
                  </div>
                )}
              </div>
              <div
                className={styles.productDetails_img_actions_item}
                onClick={() =>
                  openModal(<AddToListModal />, {
                    className: "modal__add_to_list rounded-medium",
                    size: "md",
                  })
                }
              >
                <div
                  ref={tooltipKey === "list" ? setReferenceElement : null}
                  className={styles.productDetails_img_actions_text}
                  onMouseEnter={() => setTooltipKey("list")}
                  onMouseLeave={() => setTooltipKey(null)}
                >
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.list_icon}>
                      <use href="#list"></use>
                    </svg>
                  </div>
                </div>
                {tooltipKey === "list" && (
                  <div
                    ref={setPopperElement}
                    style={popperStyles.popper}
                    {...attributes.popper}
                    className={`${tooltipKey ? "tooltip__active" : "tooltip__inactive"} actions_tooltip`}
                  >
                    افزودن به لیست
                  </div>
                )}
              </div>
            </div>
            <div
              className="position-relative d-flex align-items-center"
              onClick={() =>
                openModal(<GalleryModal selectedSlideIndex={0} />, {
                  name: "album",
                  className: "modal__album",
                  size: "full",
                })
              }
            >
              <div className={styles.productDetails_img_container}>
                <picture>
                  <source
                    srcSet={
                      isSelectedColor && mainImage?.image_url
                        ? mainImage?.image_url
                        : productDetails?.images?.main?.webp_url?.[0]
                    }
                    type="image/webp"
                  />
                  <source
                    srcSet={
                      isSelectedColor
                        ? mainImage?.image_url
                        : productDetails?.images?.main?.url?.[0]
                    }
                    type="image/jpeg"
                  />
                  <img
                    src={
                      isSelectedColor
                        ? mainImage?.image_url
                        : productDetails?.images?.main?.url?.[0]
                    }
                    alt={productDetails?.title_fa}
                    title={productDetails?.title_fa}
                    className={styles.productDetails_img}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>

        <Gallery />
        <div
          className={styles.productDetails_feedback_container}
          onClick={() =>
            openModal(<ProductFeedbackDesktopModal />, {
              name: "product-feedback",
              className: "modal__product-feedback rounded-medium",
            })
          }
        >
          <div className={styles.productDetails_feedback}>
            <div className="d-flex">
              <div className={styles.productDetails_feedback_icon_container}>
                <div
                  data-icon-name="cube-info-outline"
                  data-icon="&#xE940;"
                  className={`${styles.productDetails_feedback_icon} cube-font-icon`}
                ></div>
              </div>
              <span className={styles.productDetails_feedback_text}>
                گزارش مشخصات کالا یا موارد قانونی
              </span>
            </div>
          </div>
          <span className={styles.productDetails_feedback_text}>
            DKP-{productDetails?.id}
          </span>
        </div>
      </div>
    </>
  );
}

export default InfoSectionRight;

import { useState, useEffect } from "react";

import { useCartContext } from "@/contexts/CartContext";

import CartActionBox from "@/features/cart/sections/cartActionBox/CartActionBox";

import styles from "./orderItem.module.css";
import { useUserContext } from "@/contexts/UserContext";

export default function OrderItem({ item }) {
  const [productQuantity, setProductQuantity] = useState(0);
  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [loadingState, setLoadingState] = useState(null);

  const { user } = useUserContext();

  const {
    userCart,
    loadingVariantId,
    addProductToCart,
    removeProductFromCart,
  } = useCartContext();

  const guestCartId = localStorage.getItem("guestCartId");

  const addProductToCartHandler = ({ variantId }) => {
    setLoadingState({
      variantId,
      action: "add",
    });

    addProductToCart(
      {
        guestCartId,
        productId: item?.product?.id,
        variantId,
        quantity: 1,
      },
      {
        onSuccess: (res) => {
          if (!user?.is_logged_in && res.guestCartId) {
            localStorage.setItem("guestCartId", res.guestCartId);
          }

          if (!res?.cart?.items_count) {
            handleAddToCartSuccess();
          }
        },
        onSettled: () => {
          setLoadingState(null);
        },
      },
    );
  };

  const removeProductFromCartHandler = ({ variantId }) => {
    setLoadingState({
      variantId,
      action: "remove",
    });

    removeProductFromCart(
      {
        guestCartId,
        variantId,
      },
      {
        onSettled: () => {
          setLoadingState(null);
        },
      },
    );
  };

  const handleAddToCartSuccess = () => {
    setShowAddToCartSuccess(true);
  };

  useEffect(() => {
    if (userCart) {
      setProductQuantity(item?.quantity || 0);
    }
  }, [userCart]);

  const maxLimit = item?.variant?.price?.order_limit || Infinity;
  const isMaxReached = item?.quantity === maxLimit;
  const isJetEligible =
    item?.product?.digiplus?.is_jet_eligible ||
    item?.product?.shipment_methods?.providers?.[0]?.shipping_mode === "jet";

  return (
    <div className={styles.product_container}>
      <div className={styles.product}>
        <div className="position-relative">
          <div
            layout="responsive"
            role="img"
            aria-hidden="false"
            aria-label="وکس موبر ماهریس مدل بلوبری وزن ۵۰۰ گرم"
            className={styles.product_img_container}
          >
            <picture>
              <source
                type="image/webp"
                src={item?.product?.images?.main?.url?.[0]}
              />
              <source
                type="image/jpeg"
                src={item?.product?.images?.main?.url?.[0]}
              />
              <img
                title=""
                src={item?.product?.images?.main?.url?.[0]}
                alt={item?.product?.title_fa}
                className={styles.product_img}
              />
            </picture>
          </div>
          <div className="d-flex justify-content-center align-items-center position-absolute left-0 top-0 text-caption-strong"></div>
          <div className="d-flex justify-content-center align-items-center position-absolute left-0 bottom-0 text-caption-strong"></div>
        </div>
        <CartActionBox
          noShadow
          quantityBoxClassName={styles.quantity_box}
          productQuantity={productQuantity}
          isMaxReached={isMaxReached}
          addProductToCartHandler={() =>
            addProductToCartHandler({
              variantId: item?.variant?.id,
            })
          }
          removeProductFromCartHandler={() =>
            removeProductFromCartHandler({
              variantId: item?.variant?.id,
              removeFromextPurchase: false,
            })
          }
          isLoading={
            loadingState?.variantId === item?.variant?.id &&
            ["add", "remove"].includes(loadingState?.action)
          }
        />

        <div className={styles.product_color}>
          <div className="d-flex align-items-center">
            <span>{item?.variant?.color?.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

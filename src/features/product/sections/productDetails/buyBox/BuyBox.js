"use client";

import { useState } from "react";
import Link from "next/link";

import { usePopper } from "react-popper";

import AddToCartSuccess from "@/features/shared/modals/addToCartSuccess/AddToCartSuccess";
import SellerPopper from "@/features/product/sections/sellerPopper/SellerPopper";
import OutOfStockBox from "@/features/product/sections/productDetails/buyBox/OutOfStockBox";
import SellerBox from "./sellerBox/SellerBox";
import GiftBox from "./giftBox/GiftBox";
import PriceFeedbackBox from "./priceFeedbackBox/PriceFeedbackBox";
import ScoreBox from "./scoreBox/ScoreBox";
import ShippingBox from "./shippingBox/ShippingBox";
import GuaranteeBox from "./guarantee/GuaranteeBox";
import ShipmentBox from "./shipmentBox/ShipmentBox";
import PriceBox from "./priceBox/PriceBox";

import { useProductContext } from "@/contexts/ProductContext";
import scrollToSection from "@/utils/scrollToSection";

import styles from "./buyBox.module.css";

function BuyBox() {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: "right-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 12],
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: 16,
          },
        },
      ],
    },
  );

  const [showAddToCartSuccess, setShowAddToCartSuccess] = useState(false);
  const [isOpenSellerPopper, setIsOpenSellerPopper] = useState(false);

  const { productDetails, activeVariant, uniqueVariants } = useProductContext();

  return (
    <>
      {showAddToCartSuccess && (
        <AddToCartSuccess
          product={productDetails}
          setShowAddToCartSuccess={setShowAddToCartSuccess}
          width="375px"
        />
      )}
      {productDetails?.default_variant ? (
        <div className={styles.buy_box_area}>
          <div className={styles.buy_box_container}>
            <div className={styles.buy_box}>
              <div className={styles.buy_box_header}>
                <h3 className={styles.buy_box_header_seller}>فروشنده</h3>
                {uniqueVariants?.length && uniqueVariants?.length !== 1 ? (
                  <span
                    className={styles.buy_box_header_other_sellers}
                    onClick={() => scrollToSection("sellerSection", 220)}
                  >{`${(uniqueVariants?.length - 1).toLocaleString(
                    "fa-IR",
                  )} فروشنده دیگر`}</span>
                ) : (
                  ""
                )}
              </div>
              <SellerPopper
                seller={activeVariant}
                isOpenSellerPopper={isOpenSellerPopper}
                setPopperElement={setPopperElement}
                popperStyles={popperStyles}
                attributes={attributes}
              />

              <SellerBox
                setReferenceElement={setReferenceElement}
                setIsOpenSellerPopper={setIsOpenSellerPopper}
              />
              <PriceBox setShowAddToCartSuccess={setShowAddToCartSuccess} />
              <GuaranteeBox />
              <ShipmentBox />
              <ShippingBox />
              <GiftBox />
              <ScoreBox />
              <div className={styles.buy_box_footer}></div>
            </div>
            <Link
              href="https://about.digikala.com/newsroom/pricing-sale-and-price-monitoring-at-digikala/"
              target="_blank"
              className="w-100"
            >
              <div className={styles.how_pricing}>
                <div className="d-flex align-items-center">
                  <div className="d-flex ms-2">
                    <div
                      data-icon-name="cube-nav-chevron-left"
                      data-icon="&#xE940;"
                      className={`${styles.how_pricing_warning_icon} cube-font-icon`}
                    ></div>
                  </div>
                  <span className={styles.how_pricing_warning_text}>
                    فرآیند قیمت‌گذاری و نظارت بر قیمت
                  </span>
                </div>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.chevron_left_icon}>
                    <use href="#chevronLeft"></use>
                  </svg>
                </div>
              </div>
            </Link>
            <PriceFeedbackBox />
          </div>
        </div>
      ) : (
        <OutOfStockBox />
      )}
    </>
  );
}

export default BuyBox;

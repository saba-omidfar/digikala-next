"use client";

import { useModal } from "@/contexts/modalContext";

import NextCartMobileModal from "@/features/cart/modals/nextCartMobileModal/NextCartMobileModal";
import SaveToListModal from "@/features/cart/modals/saveToListModal/SaveToListModal";
import CartActionModal from "@/features/shared/modals/cartActionModal/cartActionModal/CartActionModal";
import CartBillBoxModal from "@/features/cart/modals/cartBillBoxModal/CartBillBoxModal";
import DigiclubModal from "@/features/product/modals/digiclubModal/DigiclubModal";
import SizeAndReviewModal from "@/features/product/modals/sizeAndReviewModal/SizeAndReviewModal";
import MobileInsuranceModal from "@/features/product/modals/mobileInsuranceModal/MobileInsuranceModal";
import MobileLocationsModal from "@/components/layout/header/modals/mobileLocationsModal/MobileLocationsModal";
import SortDetails from "@/features/search/sections/sortDetails/SortDetails";
import FiltersDetails from "@/features/search/sections/filtersDetails/FiltersDetails";
import MobileSpecDetailsModal from "@/features/product/modals/mobileSpecDetailsModal/MobileSpecDetailsModal";
import PriceFeedbackMobileSheet from "../../features/product/modals/priceFeedbackMobileSheet/PriceFeedbackMobileSheet";
import ReturnReasonMobileSheet from "@/features/product/modals/returnReasonMobileSheet/ReturnReasonMobileSheet";
import ProductFeedbackMobileSheet from "@/features/product/modals/productFeedbackMobileSheet/ProductFeedbackMobileSheet";
import MobileSellersModal from "@/features/product/modals/mobileSellersModal/MobileSellersModal";
import MobileQuestionDetailsModal from "@/features/product/modals/mobileQuestionDetailsModal/MobileQuestionDetailsModal";

export default function MobileModalRenderer({ scope }) {
  const { mobileModals } = useModal();

  return (
    <>
      {mobileModals
        .filter((modal) => modal.scope === scope)
        .map((modal) => {
          switch (modal.name) {
            case "next-cart-mobile":
              return <NextCartMobileModal key={modal.id} {...modal.props} />;

            case "cart-action-modal":
              return <CartActionModal key={modal.id} {...modal.props} />;

            case "cart-next-tab-sort-header":
              return <CartActionModal key={modal.id} {...modal.props} />;

            case "save-to-list":
              return <SaveToListModal key={modal.id} {...modal.props} />;

            case "cart-bill-box":
              return <CartBillBoxModal key={modal.id} {...modal.props} />;

            case "digiclub":
              return <DigiclubModal key={modal.id} {...modal.props} />;

            case "size_guide":
              return <SizeAndReviewModal key={modal.id} {...modal.props} />;

            case "insurance":
              return <MobileInsuranceModal key={modal.id} {...modal.props} />;

            case "location":
              return <MobileLocationsModal key={modal.id} {...modal.props} />;

            case "mobile-sort":
              return <SortDetails key={modal.id} {...modal.props} />;

            case "filter-details":
              return <FiltersDetails key={modal.id} {...modal.props} />;

            case "spec-details":
              return <MobileSpecDetailsModal key={modal.id} {...modal.props} />;

            case "price-feedback":
              return (
                <PriceFeedbackMobileSheet key={modal.id} {...modal.props} />
              );

            case "return-reason":
              return (
                <ReturnReasonMobileSheet key={modal.id} {...modal.props} />
              );

            case "product-feedback":
              return (
                <ProductFeedbackMobileSheet key={modal.id} {...modal.props} />
              );

            case "sellers":
              return <MobileSellersModal key={modal.id} {...modal.props} />;

            case "question-details":
              return (
                <MobileQuestionDetailsModal key={modal.id} {...modal.props} />
              );

            default:
              return null;
          }
        })}
    </>
  );
}

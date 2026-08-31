import DigiplusBenefitCardTemporary from "@/features/cart/sections/cartSection/digiplusBenefitCardTemporary/DigiplusBenefitCardTemporary";
import CartItem from "@/features/cart/sections/cartItem/CartItem";
import CartSectionTitle from "@/features/cart/sections/cartSection/cartSectionTitle/CartSectionTitle";
import EmptyBasket from "@/features/cart/sections/emptyBasket/EmptyBasket";
import AddToNextCartLoading from "@/features/cart/sections/addToNextCartLoading/AddToNextCartLoading";
import SaveToListModal from "@/features/cart/modals/saveToListModal/SaveToListModal";

import { useUserContext } from "@/contexts/UserContext";
import { useCartContext } from "@/contexts/CartContext";

import styles from "./cartSection.module.css";

export default function CartSection() {
  const { user, guestCartId } = useUserContext();
  const { basket, isLoadingAddToNextCart, loadingVariantId, saveToListData } =
    useCartContext();

  const isBasketEmpty = basket.length === 0;

  return (
    <>
      {saveToListData ? <SaveToListModal {...saveToListData} /> : ""}
      <section className={styles.cart_section_container}>
        <div className={styles.cart_section}>
          <>
            {/* <DigiplusBenefitCardTemporary /> */}
            <CartSectionTitle />
            <div className={styles.cart_items_container}>
              {!isBasketEmpty ? (
                <div className="d-flex flex-column">
                  {basket?.map((item, index) => (
                    <div key={index} className="position-relative">
                      {loadingVariantId === item.variant.id &&
                        isLoadingAddToNextCart && <AddToNextCartLoading />}
                      <CartItem item={item} />
                      {basket.length !== 1 && index !== basket.length - 1 ? (
                        <div className={styles.divider}>
                          <div className={styles.line_container}>
                            <div className={styles.line}></div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyBasket />
              )}
            </div>
          </>
          {/* {!isBasketTab && (
              <>
                {!isNextPurchaseBasketEmpty ? (
                  <NextPurchaseCart
                    activeTab={activeTab}
                    nextPurchaseBasket={nextPurchaseBasket}
                  />
                ) : (
                  <EmptyBasket activeTab={activeTab} />
                )}
              </>
            )} */}
        </div>
      </section>
    </>
  );
}

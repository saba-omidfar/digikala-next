import CheckoutSidebar from "@/features/cart/sections/checkoutSidebar/CheckoutSidebar";
import ViewedProducts from "@/features/cart/sections/viewedProducts/ViewedProducts";
import NextCart from "@/features/cart/sections/nextCart/NextCart";
import CartSection from "@/features/cart/sections/cartSection/CartSection";
import Spinner from "@/utils/Spinner";
import MobileFooter from "@/features/cart/sections/mobileFooter/MobileFooter";

import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./cartMobile.module.css";

function CartMobile() {
  const { basket, isLoadingUserCart } = useCartContext();
  const { user } = useUserContext();

  if (isLoadingUserCart) {
    return (
      <div className={styles.spinner_container}>
        <Spinner size={40} color="rgb(237, 25, 68)" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.Desktop_content}>
          <div className={styles.cart_container}>
            <CartSection />
            {basket.length > 0 && <CheckoutSidebar />}

            <div className={styles.divider}>
              <div className={styles.divider_line}></div>
            </div>
          </div>
          <div className={styles.cart_footer}>
            <ViewedProducts />
            {/* <div className={styles.divider}>
              <div className={styles.divider_line}></div>
            </div> */}
            {user ? <NextCart /> : ""}
          </div>
        </div>
      </div>
      {!isLoadingUserCart ? <MobileFooter activeMenu="basket" /> : ""}
    </>
  );
}

export default CartMobile;

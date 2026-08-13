import Header from "@/components/layout/header/desktop/Header";
import CheckoutSidebar from "@/features/cart/sections/checkoutSidebar/CheckoutSidebar";
import ViewedProducts from "@/features/cart/sections/viewedProducts/ViewedProducts";
import NextCart from "@/features/cart/sections/nextCart/NextCart";
import CartSection from "@/features/cart/sections/cartSection/CartSection";
import Footer from "@/components/layout/footer/desktop/Footer";
import Spinner from "@/utils/Spinner";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useGetUniversal } from "@/hooks/useGetUniversal";
import { useCartContext } from "@/contexts/CartContext";

import styles from "./cartDesktop.module.css";

function CartDesktop() {
  const { isClientReady } = useScreenStatus();
  const { basket, isLoadingUserCart } = useCartContext();
  const { data: topMegaMenuBanners } = useGetUniversal();

  const isBasketEmpty = basket.length === 0;

  if (!isClientReady) return;

  return (
    <>
      <Header />
      <div
        className={styles.container}
        style={{ paddingTop: topMegaMenuBanners ? 184 : 124 }}
      >
        <div className={styles.Desktop_content}>
          {isLoadingUserCart ? (
            <div className="spinner_container">
              <Spinner size={40} color="rgb(237, 25, 68)" />
            </div>
          ) : (
            <>
              <div className={styles.cart_container}>
                <CartSection />
                {!isBasketEmpty && <CheckoutSidebar />}

                <div className={styles.divider}>
                  <div className={styles.divider_line}></div>
                </div>
              </div>

              <div className={styles.cart_footer}>
                <ViewedProducts />
                <div className={styles.divider}>
                  <div className={styles.divider_line}></div>
                </div>
                <NextCart />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartDesktop;

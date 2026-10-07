import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useCartContext } from "@/contexts/CartContext";
import recalcCartPrices from "@/utils/recalcCartPrices";

import OrderItem from "../orderItem/OrderItem";

import styles from "./orders.module.css";

export default function Orders() {
  const { userCart } = useCartContext();
  const { basket } = recalcCartPrices(userCart?.cart);

  return (
    <div className={styles.orders_container}>
      <div className="overflow-x-hidden">
        <div className="d-flex flex-row justify-content-between w-100 mx-auto position-relative">
          <div className="position-relative flex-1 w-100">
            <div>
              <Swiper
                slidesPerView={"auto"}
                slidesPerGroup={5}
                spaceBetween={0}
              >
                {basket?.map((item) => (
                  <SwiperSlide className={styles.product}>
                    <OrderItem item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

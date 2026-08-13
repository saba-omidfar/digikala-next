"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import MiddleFooterFeature from "./MiddleFooterFeature";
import styles from "./middleFooter.module.css";

function MiddleFooter() {
  const footerFeatures = [
    {
      id: 1,
      caption: "امکان تحویل اکسپرس",
      src: "/images/svg/infosection/express-delivery.svg",
      href: "/faq/question/79/",
    },
    {
      id: 2,
      caption: "۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ",
      src: "/images/svg/infosection/cash-on-delivery.svg",
      href: "/faq/question/80/",
    },
    {
      id: 3,
      caption: "امکان پرداخت در محل",
      src: "/images/svg/infosection/support.svg",
      href: "/faq/question/81/",
    },
    {
      id: 4,
      caption: "هفت روز ضمانت بازگشت کالا",
      src: "/images/svg/infosection/days-return.svg",
      href: "/faq/question/83/",
    },
    {
      id: 5,
      caption: "ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻻ",
      src: "/images/svg/infosection/original-products.svg",
      href: "/faq/question/82/",
    },
  ];

  return (
    <div className="w-100 px-3">
      <div className={styles.middle_footer}>
        <div className="w-100 d-flex row-gap-4 lg:gap-y-2 mx-auto justify-content-between">
          <Swiper slidesPerView={5} spaceBetween={24} className="w-100">
            {footerFeatures.map((feature) => (
              <SwiperSlide key={feature.id}>
                <MiddleFooterFeature feature={feature} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default MiddleFooter;

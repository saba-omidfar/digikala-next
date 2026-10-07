"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import FooterFearure from "../sections/footerFeature/FooterFearure";
import FooterPartners from "../sections/footerPartners/FooterPartners";
import FooterWithDigikalaBox from "../sections/footerWithDigikalaBox/FooterWithDigikalaBox";

import styles from "./footer.module.css";

const footerFeatures = [
  {
    label: "با دیجی‌کالا",
    children: [
      {
        label: "اتاق خبر دیجی‌کالا",
        to: "https://about.digikala.com/newsroom/",
      },
      {
        label: "فروش در دیجی‌کالا",
        to: "https://www.digikala.com/landings/seller-introduction/",
      },
      { label: "فرصت‌های شغلی", to: "https://careers.digikala.com/" },
      {
        label: "گزارش تخلف در دیجی‌کالا",
        to: "https://digikalapublic.whistleblowernetwork.net/frontpage",
      },
      {
        label: "تماس با دیجی‌کالا",
        to: "https://digikalapublic.whistleblowernetwork.net/frontpage",
      },
      {
        label: "درباره‌ی دیجی‌کالا",
        to: "https://about.digikala.com/",
      },
    ],
  },
  {
    label: "خدمات مشتریان",
    children: [
      {
        label: "پاسخ به پرسش‌های متداول",
        to: "/faq/",
      },
      {
        label: "رویه‌های بازگرداندن کالا",
        to: "/faq/question/83/",
      },
      { label: "شرایط استفاده", to: "/page/terms/" },
      {
        label: "حریم خصوصی",
        to: "/page/privacy/",
      },
      {
        label: "گزارش باگ",
        to: "https://www.digikala.com/page/bug-report/",
      },
    ],
  },
  {
    label: "راهنمای خرید از دیجی‌کالا",
    children: [
      {
        label: "نحوه ثبت سفارش",
        to: "/faq/question/649/",
      },
      {
        label: "رویه ارسال سفارش",
        to: "/faq/question/79/",
      },
      { label: "شیوه‌های پرداخت", to: "/faq/question/81/" },
    ],
  },
];

const footerPartners = {
  label: "شرکای تجاری",
  children: [
    {
      label: "مجله اینترنتی دیجی‌کالا مگ",
      to: "https://www.digikala.com/mag/",
      src: "/images/svg/footer/digimag.svg",
    },
    {
      label: "بهترین راهکارهای پرداخت آنلاین",
      to: "https://www.mydigipay.com/",
      src: "/images/svg/footer/digipay.svg",
    },
    {
      label:
        "خرید آنلاین مد و لباس از فروشگاه اینترنتی دیجی‌استایل با همان تجربه از دیجی‌کالا",
      to: "https://www.digistyle.com/",
      src: "/images/svg/footer/digistyle.svg",
    },
    {
      label: "خدمات ویژه دیجی‌کالا برای کاربران با اشتراک پلاس",
      to: "https://www.digikala.com/plus/landing/",
      src: "/images/svg/footer/digiplus.svg",
    },
    {
      label: "دیجی کلاب باشگاه مشتریان دیجیکالا",
      to: "https://www.digikala.com/digiclub/",
      src: "/images/svg/footer/digiclub.svg",
    },
    {
      label: "خرید آنی سوپرمارکتی از فروشگاه های نزدیک",
      to: "https://digikalajet.com/",
      src: "/images/svg/footer/jet.svg",
    },
    {
      label: "دیجی‌فای",
      to: "https://digify.shop/",
      src: "/images/svg/footer/digify.svg",
    },
    {
      label: "دیجیکالا مهر - زنجیره مهربانی و لبخند",
      to: "https://mehr.digikala.com/",
      src: "/images/svg/footer/digiMehr.svg",
    },
    {
      label: "مرکز نوآوری و فناوری گروه دیجی‌کالا",
      to: "https://diginext.ir/",
      src: "/images/svg/footer/diginext.svg",
    },
    {
      label: "گنجه",
      to: "https://ganje.net/?utm_source=Digikala_web&utm_medium=Footer",
      src: "/images/svg/footer/ganjeh.svg",
    },
    {
      label: "سیستم حمل و نقل دیجی‌کالا",
      to: "https://digiexpress.ir/",
      src: "/images/svg/footer/digiexpress.svg",
    },
    {
      label: "اسمارتک",
      to: "https://smartech.ir/",
      src: "/images/svg/footer/smartech.svg",
    },
    {
      label: "دیجی‌کالا سرویس",
      to: "https://digikala-service.com/",
      src: "/images/svg/footer/digikala-service.svg",
    },
    {
      label: "دیجی‌کالا بیزینس",
      to: "https://www.digikalabusiness.com/",
      src: "/images/svg/footer/digikala-business.svg",
    },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [aboutUsContent, setAboutUsContent] = useState(false);

  const validateEmail = (email = "") => {
    const EMAIL_REQUIRED = "اینجا را خالی نگذارید";
    const EMAIL_INVALID = "پست الکترونیک وارد شده درست نیست";

    return email.trim()
      ? /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\da-z\-]+\.)+[a-z]{2,}))$/i.test(
          email,
        )
        ? true
        : EMAIL_INVALID
      : EMAIL_REQUIRED;
  };

  const goUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.footer_container}>
      <div className={styles.content}>
        <div className={styles.content_padding}>
          <div className="d-flex justify-content-between align-items-center user-select-none">
            <div className={styles.footer_logo_header}>
              <Image
                style={{ objectFit: "contain" }}
                fill
                src="/images/logo/full-horizontal.svg"
                alt="digikala - دیجی کالا"
              />
            </div>
            <button className={styles.footer_go_top__btn} onClick={goUp}>
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                <span className={styles.footer_go_top__text}>
                  بازگشت به بالا
                </span>
                <div className="d-flex">
                  <svg className={styles.footer_go_top__icon}>
                    <use href="#expandLess"></use>
                  </svg>
                </div>
              </div>
            </button>
          </div>
          <div className={styles.footer_infos}>
            <p className="flex-shrink-0 mb-0">تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</p>
            <div className="px-3 text-neutral-400 d-none d-md-block">|</div>
            <p className="flex-shrink-0">۰۲۱-۹۱۰۰۰۱۰۰</p>
            <div className="px-3 text-neutral-400 d-none d-md-block">|</div>
            <p className="w-100 mt-1 mt-md-0 mb-0">
              ۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم
            </p>
          </div>
          <div className={styles.footer_features_container}>
            <FooterFearure
              caption="امکان تحویل اکسپرس"
              src="/images/svg/footer/express-delivery.svg"
            />
            <FooterFearure
              caption="امکان پرداخت در محل"
              src="/images/svg/footer/cash-on-delivery.svg"
            />
            <FooterFearure
              caption="۷ روز ﻫﻔﺘﻪ، ۲۴ ﺳﺎﻋﺘﻪ"
              src="/images/svg/footer/support.svg"
            />
            <FooterFearure
              caption="هفت روز ضمانت بازگشت کالا"
              src="/images/svg/footer/days-return.svg"
            />
            <FooterFearure
              caption="ﺿﻤﺎﻧﺖ اﺻﻞ ﺑﻮدن ﮐﺎﻟﺎ"
              src="/images/svg/footer/original-products.svg"
            />
          </div>
          <div className="d-flex flex-wrap w-100 justify-content-between mb-4">
            {footerFeatures.map((feature, index) => (
              <FooterWithDigikalaBox key={index} feature={feature} />
            ))}
            <div className={styles.footer_social_media_container}>
              <div className={styles.footer_social_media}>
                <h4 className={styles.footer_socialMedia_title}>
                  همراه ما باشید!
                </h4>
                <div className="d-flex align-items-center">
                  <Link
                    id="footer-instagram"
                    href="https://www.instagram.com/digikalacom/"
                    className={styles.footer_social_media_link}
                  >
                    <div className="d-flex">
                      <svg className={styles.footer_social_media_icon}>
                        <use href="#instagram"></use>
                      </svg>
                    </div>
                  </Link>
                  <Link
                    id="footer-twitter"
                    href="https://twitter.com/digikalacom"
                    className={styles.footer_social_media_link}
                  >
                    <div className="d-flex">
                      <svg className={styles.footer_social_media_icon}>
                        <use href="#twitter"></use>
                      </svg>
                    </div>
                  </Link>
                  <Link
                    id="footer-linkedin"
                    href="https://www.linkedin.com/company/digikala/mycompany/"
                    className={styles.footer_social_media_link}
                  >
                    <div className="d-flex">
                      <svg className={styles.footer_social_media_icon}>
                        <use href="#linkedin"></use>
                      </svg>
                    </div>
                  </Link>
                  <Link
                    id="footer-aparat"
                    href="https://www.aparat.com/digikala/"
                    className={styles.footer_social_media_link}
                  >
                    <div className="d-flex">
                      <svg className={styles.footer_social_media_icon}>
                        <use href="#aparat"></use>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
              <div className={styles.footer_email_submission_container}>
                <h4 className={styles.footer_submitEmail_title}>
                  با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید
                </h4>
                <div className="w-100 d-flex align-items-center">
                  <form
                    action=""
                    className="w-100 d-flex"
                    onSubmit={(e) => preventDefault(e)}
                  >
                    <label
                      htmlFor=""
                      className={styles.footer_submitEmail_label}
                    >
                      <div
                        className={styles.footer_submitEmail_input_container}
                      >
                        <div className="flex-grow-1">
                          <input
                            name="email"
                            value={email}
                            type="email"
                            placeholder="ایمیل شما"
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setIsValid(validateEmail(e.target.value));
                            }}
                            className={styles.footer_submitEmail_input}
                          />
                        </div>
                      </div>
                      {isValid && (
                        <p className={styles.helper_error}>{isValid}</p>
                      )}
                    </label>
                    <button
                      type="submit"
                      id="footer-email-submission"
                      className={`${styles.footer_submit_email_disabled_btn} ${
                        email &&
                        isValid === true &&
                        styles.footer_submit_email_btn
                      }`}
                    >
                      <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                        ثبت
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer_seo}>
            <div className="flex-grow-1">
              <div
                className={`${styles.footer_seo__content} ${
                  aboutUsContent ? styles.no_before : ""
                }`}
                style={{
                  height: aboutUsContent ? "auto" : "125px",
                }}
              >
                <h1>دیجی کالا؛ بزرگترین فروشگاه اینترنتی ایران</h1>
                <p>
                  دیجی کالا سال‌ها است که به انتخاب اول بسیاری از خریداران
                  اینترنتی تبدیل شده است. دیجی کالا به عنوان بزرگ‌ترین و
                  معتبرترین فروشگاه آنلاین ایران، شناخته‌شده‌ترین فروشگاه نیز
                  محسوب می‌شود. این فروشگاه آنلاین نه‌تنها گسترده‌ترین تنوع کالا
                  را در دسته‌بندی‌های مختلف ارائه می‌دهد، بلکه با خدمات بی‌نظیر،
                  ارسال سریع، ضمانت اصل بودن کالا و پشتیبانی حرفه‌ای، استاندارد
                  جدیدی در خرید اینترنتی ایران تعریف کرده است. این فروشگاه با
                  سال‌ها تجربه و اعتماد مشتریان، کامل‌ترین و بهترین گزینه برای
                  خرید آنلاین در ایران محسوب می‌شود.
                </p>
                <h2>ویژگی های مهم دیجی کالا</h2>
                <p>
                  یکی از ویژگی‌های مهم در خرید از دیجی کالا، تنوع بی‌نظیر
                  محصولات است. این فروشگاه اینترنتی طیف وسیعی از کالاها را در
                  دسته‌های مختلف از جمله لوازم دیجیتال، لوازم خانگی، مد و پوشاک،
                  لوازم آرایشی و بهداشتی، محصولات سلامت و زیبایی، و بسیاری از
                  محصولات دیگر ارائه می‌دهد. به عنوان مثال، اگر به دنبال خرید یک{" "}
                  <a href="https://www.digikala.com/search/category-mobile-phone/">
                    گوشی موبایل
                  </a>{" "}
                  جدید باشید، دیجی کالا مجموعه‌ای از بهترین گوشی‌ها از برندهای
                  معتبر اپل و سامسونگ مانند ایفون 16،{" "}
                  <a href="https://www.digikala.com/tags/samsung-s25/">
                    گوشی S25
                  </a>
                  ، گوشی‌های مختلف از برند شیائومی مانند{" "}
                  <a href="https://www.digikala.com/product/dkp-17580036/%DA%AF%D9%88%D8%B4%DB%8C-%D9%85%D9%88%D8%A8%D8%A7%DB%8C%D9%84-%D8%B4%DB%8C%D8%A7%D8%A6%D9%88%D9%85%DB%8C-%D9%85%D8%AF%D9%84-redmi-note-14-4g-%D8%AF%D9%88-%D8%B3%DB%8C%D9%85-%DA%A9%D8%A7%D8%B1%D8%AA-%D8%B8%D8%B1%D9%81%DB%8C%D8%AA-256-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA-%D9%88-%D8%B1%D9%85-8-%DA%AF%DB%8C%DA%AF%D8%A7%D8%A8%D8%A7%DB%8C%D8%AA">
                    شیائومی نوت ۱۴
                  </a>{" "}
                  و بسیاری از برندهای دیگر را در اختیار شما قرار می‌دهد. همچنین
                  برای علاقه‌مندان به لوازم دیجیتال، این فروشگاه اینترنتی انواع
                  لپ تاپ،{" "}
                  <a href="https://www.digikala.com/search/category-tv2/">
                    تلویزیون
                  </a>
                  ،{" "}
                  <a href="https://www.digikala.com/search/category-speaker/">
                    اسپیکر
                  </a>
                  ، و هندزفری بلوتوثی با کیفیت بالا را برای خرید آنلاین ارائه
                  می‌دهد. دیجی کالا، مقصدی بی‌پایان برای خرید آسان، سریع و مطمئن
                  است. راهی که هر آنچه نیاز دارید از{" "}
                  <a href="https://www.digikala.com/search/category-notebook-netbook-ultrabook/">
                    قیمت لپ تاپ
                  </a>{" "}
                  تا یک ایرپاد مطمئن را در اختیار شما قرار می‌دهد.&nbsp;
                </p>
                <h3>ارسال سریع و مطمئن کالا</h3>
                <p>
                  یکی از مهم‌ترین دغدغه‌های کاربران خرید آنلاین، زمان تحویل کالا
                  است. دیجی کالا برای حل این مشکل، گزینه‌های مختلف ارسال را در
                  نظر گرفته است تا کاربران بتوانند بر اساس نیاز خود، روش ارسال
                  مناسب را انتخاب کنند. به عنوان مثال، ارسال کالا به صورت تحویل
                  امروز با ارسال سریع دیجی‌کالا، از جمله روش‌های خرید سریع از
                  این فروشگاه اینترنتی است. این امکانات باعث می‌شود که خریداران
                  بتوانند سفارش خود را در کوتاه‌ترین زمان ممکن دریافت کنند.
                  علاوه بر این، در صورتی که کالای خریداری شده از لحاظ کیفیت یا
                  هر دلیل دیگری رضایت مشتری را جلب نکرده باشد، دیجی کالا ضمانت
                  بازگشت کالا را ارائه می‌دهد. این ویژگی موجب اعتماد بیشتر
                  مشتریان به خرید آنلاین از فروشگاه اینترنتی دیجی کالا شده است.
                </p>
                <h3>تخفیف های ویژه و جشنواره ها</h3>
                <p>
                  دیجی کالا به طور منظم جشنواره‌ها و تخفیف‌های ویژه‌ای را برگزار
                  می‌کند که برای مشتریان فرصت خرید کالاهای باکیفیت با قیمت‌های
                  مناسب به همراه خواهد داشت. این تخفیف‌ها در ایام خاص مانند بلک
                  فرایدی یا همان حراج جمعه سیاه و جشنواره‌های تابستانی توجه
                  بسیاری از خریداران را جلب می‌کند. در این جشنواره‌ها، دیجی کالا
                  تخفیف‌های عالی روی محصولات مختلف از جمله گوشی‌های موبایل، لپ
                  تاپ‌ها، تلویزیون‌ها، و حتی محصولات زیبایی ارائه می‌دهد.
                  می‌توانید گوشی{" "}
                  <a href="https://www.digikala.com/tags/iphone-16/">
                    ایفون ۱۶
                  </a>{" "}
                  یا گوشی S25 را با تخفیف‌های ویژه خریداری کنید و از قیمت مناسب
                  بهره‌مند شوید. دیجی کالا فراتر از یک فروشگاه اینترنتی، یک
                  تجربه خرید مطمئن در بین کاربران مختلف بوده است که با ارائه
                  بزرگ‌ترین تنوع کالا، قیمت‌های مختلف و خدماتی بی‌نقص، به مقصد
                  اول خریداران آنلاین در ایران تبدیل شده است.
                </p>
                <h2>انواع محصولات فروشگاه دیجی کالا</h2>
                <p>
                  دیجی کالا دارای محصولات متنوعی در گروه‌های مختلف است که خرید
                  آنها بسیار راحت و سریع است. به عنوان مثال، اگر به دنبال{" "}
                  <a href="https://www.digikala.com/search/category-cell-phone-pouch-cover/">
                    قاب گوشی
                  </a>{" "}
                  یا{" "}
                  <a href="https://www.digikala.com/search/category-headphone/">
                    هندزفری بلوتوثی
                  </a>{" "}
                  باشید، می‌توانید مدل‌های مختلف و برندهای گوناگونی را در این
                  فروشگاه پیدا کنید.&nbsp;
                </p>
                <h3>موبایل و کالای دیجیتال</h3>
                <p>
                  دیجی‌کالا انواع گوشی‌های هوشمند از برندهای معتبر جهانی مانند
                  سامسونگ، اپل، شیائومی و هواوی را با مشخصات و قیمت‌های متنوع
                  عرضه می‌کند. علاوه بر موبایل، دیجی‌کالا مجموعه‌ای از لوازم
                  جانبی مانند هدفون، هندزفری، ساعت‌های هوشمند، تبلت‌ها و لپ تاپ
                  را نیز در اختیار مشتریان قرار می‌دهد. با امکان مقایسه محصولات،
                  مطالعه نظرات کاربران و دسترسی به جدیدترین مدل‌ها، دیجی‌کالا به
                  یکی از مقاصد اصلی خرید آنلاین در حوزه موبایل و کالای دیجیتال
                  تبدیل شده است. از دهه گذشته همواره دیجی کالا به عنوان اولین
                  گزینه برای{" "}
                  <a href="https://www.digikala.com/search/category-mobile-phone/samsung/">
                    خرید گوشی های سامسونگ
                  </a>
                  ،{" "}
                  <a href="https://www.digikala.com/search/category-mobile-phone/apple/">
                    آیفون های اپل
                  </a>{" "}
                  و{" "}
                  <a href="https://www.digikala.com/search/category-mobile-phone/xiaomi/">
                    گوشی شیائومی
                  </a>{" "}
                  محسوب می‌شده است و تا امروز هم در عرضه این موبایل های محبوب به
                  بازار، دیجی‌کالا اولین فروشگاه آنلاین بوده است.&nbsp;
                </p>
                <h3>کتاب و لوازم تحریر</h3>
                <p>
                  کتاب،
                  <a href="https://www.digikala.com/search/category-stationery/">
                    {" "}
                    لوازم تحریر
                  </a>{" "}
                  و هنر در دیجی کالا یک مجموعه بی‌نظیر از محصولات فرهنگی و هنری
                  است که به علاقه‌مندان به کتابخوانی، هنر و نوشتن کمک می‌کند تا
                  دنیای خود را گسترش دهند. از کتاب‌های چاپی و کتاب‌های صوتی
                  گرفته تا مجلات خارجی و داخلی و آثار معروف‌ترین نویسندگان مثل
                  سعدی، حافظ، مولانا و فروغ فرخزاد، تمامی نیازهای کتابخوان‌ها را
                  پوشش می‌دهد. همچنین با مجموعه‌ای از لوازم تحریر، ابزار نقاشی و
                  رنگ‌آمیزی، آلبوم‌های عکس و فرش‌های دستبافت، به شما این امکان
                  را می‌دهد تا دنیای هنر و خلاقیت خود را به بهترین نحو پرورش
                  دهید. همچنین خر سال تقریبا همزمان با تهران و نمایشگاه بین
                  المللی کتاب، دیجی کالا نمایشگاه مجازی کتاب خود را برگزار
                  می‌کند تا آنها که فرصت حضور در نمایشگاه را ندارند، بتوانند
                  مجازی از کتاب ها بازدید و خرید کنند.&nbsp;
                </p>
                <h3>لوازم آرایشی و بهداشتی</h3>
                <p>
                  در دسته محصولات آرایشی و بهداشتی، دیجی کالا مجموعه‌ای از
                  بهترین و پرطرفدارترین برندهای جهانی را در اختیار کاربران قرار
                  می‌دهد. محصولات متنوعی همچون{" "}
                  <a href="https://www.digikala.com/search/category-moisturizing-cream/">
                    مرطوب كننده‌ها
                  </a>
                  ،{" "}
                  <a href="https://www.digikala.com/search/category-foundation/">
                    كرم پودر
                  </a>
                  ،{" "}
                  <a href="https://www.digikala.com/search/category-sunscreen-cream/">
                    ضدآفتاب
                  </a>
                  ، ريمل و{" "}
                  <a href="https://www.digikala.com/search/category-lipstick/">
                    رژلب
                  </a>{" "}
                  از برندهایی مانند لورال، کلینیک و میبلین در دیجی کالا موجود
                  هستند که برای هر سلیقه و نیاز قابل انتخاب هستند. علاوه بر این،
                  شما می‌توانید محصولات مراقبت از پوست و مو مانند شامپو، کرم‌های
                  ضد چروک و ماسک صورت را در این فروشگاه بیابید و خرید آنلاین خود
                  را به راحتی انجام دهید. دیجی کالا، بزرگ‌ترین و معتبرترین
                  فروشگاه آنلاین لوازم آرایشی ایران، جایی که تنوع، کیفیت و
                  اطمینان در خرید یکجا جمع شده‌اند.
                </p>
                <h3>خرید آنلاین طلا و جواهرات</h3>
                <p>
                  دیجی کالا به عنوان بزرگترین فروشگاه اینترنتی ایران، یکی از
                  بهترین گزینه‌ها برای{" "}
                  <a href="https://www.digikala.com/landing/gold-jwelery-category-page/">
                    خرید طلا
                  </a>{" "}
                  و جواهرات آنلاین است. شما می‌توانید{" "}
                  <a href="https://www.digikala.com/search/category-women-gold-necklace/">
                    خريد گردنبند طلا
                  </a>
                  ، انگشتر طلا، گوشواره زنانه طلا و{" "}
                  <a href="https://www.digikala.com/search/category-women-gold-bracelet/">
                    دستبند طلا
                  </a>{" "}
                  را با بهترین{" "}
                  <a href="https://www.digikala.com/wealth/landing/digital-gold/">
                    قیمت‌ طلا
                  </a>{" "}
                  از دیجی کالا انجام دهید. این فروشگاه مجموعه‌ای از بهترین
                  برندهای طلا و جواهرات را در اختیار مشتریان قرار داده است که
                  انتخاب خرید را برای آنها بسیار آسان می‌کند. همچنین می‌توانید{" "}
                  <a href="https://www.digikala.com/search/category-gold-coin/">
                    خريد سكه
                  </a>
                  ، و حتی ربع سكه را نیز از این فروشگاه با راحت‌ترین روش انجام
                  دهید.&nbsp;
                </p>
                <h3>اسباب بازی</h3>
                <p>
                  این قسمت شامل تمامی نیازهای ضروری برای مراقبت، بهداشت، سرگرمی
                  و راحتی کودک از بدو تولد تا دوران کودکی است. از لوازم بهداشت و
                  حمام کودک و نوزاد مانند پوشک، دستمال مرطوب، شامپو کودک، حوله و
                  وان حمام نوزاد گرفته تا محصولات ویژه‌ای مثل مینی واش و شامپو
                  کودک و نوزاد، همه در این مجموعه موجود هستند. همچنین برای راحتی
                  بیشتر، انواع پوشاک و کفش کودک و نوزاد از لباس نوزادی تا کفش
                  پسرانه، کوله پشتی پسرانه، لباس دخترانه و کفش دخترانه به صورت
                  آنلاین در دسترس شما قرار دارند.
                </p>
                <p>
                  کودکان به سرگرمی‌های ویژه نیاز دارند، از همین رو دیجی کالا
                  مجموعه‌ای کامل از اسباب بازی‌ها از جمله پازل‌ها، لگو و
                  ساختنی‌ها، عروسک‌ها، فیگورها و اسپینر‌ها را به شما ارائه
                  می‌دهد.
                </p>
                <h3>لوازم خانگی و مبلمان</h3>
                <p>
                  در دسته‌بندی لوازم خانگی، دیجی کالا محصولات متنوعی را ارائه
                  می‌دهد که برای راحتی و زیبایی خانه و آشپزخانه شما طراحی
                  شده‌اند. از جمله{" "}
                  <a href="https://www.digikala.com/tags/sofa/">مبل راحتی</a>،
                  سرویس‌های خواب، آینه‌های دکوراتیو، و ظروف آشپزخانه که همگی از
                  برندهای معتبر و با کیفیت تولید شده‌اند. شما می‌توانید{" "}
                  <a href="https://www.digikala.com/search/category-pots-pans/">
                    قابلمه و تابه
                  </a>
                  ، یخچال، ماشین لباسشویی و بسیاری از لوازم خانگی دیگر را از
                  دیجی کالا خریداری کنید.
                </p>
                <p>
                  مبل‌های راحتی یکی از پرطرفدارترین محصولات خانگی در دیجی کالا
                  هستند. این{" "}
                  <a href="https://www.digikala.com/search/category-sofa/">
                    مبل‌ها
                  </a>{" "}
                  در انواع طرح‌ها و رنگ‌ها و از برندهای معتبر ساخته شده‌اند که
                  با هر دکوراسیونی هماهنگ می‌شوند. همچنین در دیجی کالا&nbsp;
                  انواع{" "}
                  <a href="https://www.digikala.com/search/category-bed/">
                    سرویس خواب
                  </a>{" "}
                  با کیفیت بالا و طراحی روز دنیا در دسترس است. علاوه بر این، اگر
                  به دنبال{" "}
                  <a href="https://www.digikala.com/search/category-decorative-mirror/">
                    آینه دکوراتیو
                  </a>{" "}
                  یا سایر لوازم تزئینی منزل هستید، این فروشگاه بهترین انتخاب‌ها
                  را به شما ارائه می‌دهد.
                </p>
                <h3>سوپرمارکت دیجی کالا</h3>
                <p>
                  در دسته‌بندی خوراکی‌ها و کالاهای اساسی دیجی کالا، شما
                  می‌توانید انواع محصولات ضروری و پرمصرف روزانه خود را پیدا
                  کنید. از شیرینی و آجیل تا نان تازه و نبات خوشمزه گرفته و رب
                  گوجه، ماکارونی، قند، رب انار، برنج و شکر و حتی شیر و{" "}
                  <a href="https://www.digikala.com/search/category-dairy/">
                    لبنیات
                  </a>{" "}
                  همه این محصولات با بالاترین کیفیت و از برندهای معتبر در دسترس
                  شما قرار دارند. این مجموعه شامل همه آن چیزی است که برای تهیه
                  یک وعده غذایی کامل و سالم به آن نیاز دارید. خرید از{" "}
                  <a href="https://www.digikala.com/main/food-beverage/">
                    سوپر مارکت آنلاین
                  </a>
                  &nbsp; کمک می‌کند که به راحتی و در کمترین زمان ممکن، مواد
                  اولیه مورد نیاز خود را با قیمت‌های مناسب و با تضمین کیفیت
                  دریافت کنید.
                </p>
                <h3>محصولات بومی و محلی</h3>
                <p>
                  در این بخش از دیجی کالا، از برنج، روغن، عسل طبیعی، حلوا شکری،
                  ارده و کنجد سنتی گرفته تا کیک و شیرینی خانگی، لواشک، برگه و
                  آلوچه خانگی، محصولات اصیل و با کیفیت ارائه می‌شود. همچنین،
                  انواع لبنیات سنتی، کره گیاهی و حیوانی محلی، خرمای محلی و
                  خشکبار و آجیل سنتی به همراه غلات و حبوبات ارگانیک، ادویه‌ها و
                  چاشنی‌های ارگانیک نظیر زعفران و زرشک ارگانیک از دیگر گزینه‌های
                  این دسته هستند. برای علاقه‌مندان به دکوراسیون سنتی نیز،
                  محصولاتی مانند لوستر دست ساز، مجسمه‌های سنتی، گلدان و تابلو
                  سنتی، کاشی و آینه سنتی و ظروف آشپزخانه دست ساز از جنس سنتی
                  وجود دارد که خانه شما را به محیطی گرم و اصیل تبدیل خواهد کرد.
                </p>
                <h3>ابزار آلات و تجهیزات</h3>
                <p>
                  این بخش شامل ابزار برقی و غیر برقی در دیجی کالا مجموعه‌ای کامل
                  از ابزارهای مورد نیاز برای پروژه‌های صنعتی، تعمیرات و ساخت
                  می‌شود. از ابزارهای برقی مانند دریل، پیچ گوشتی، فرز، سنگ
                  رومیزی، موتور برق و مکنده-دمنده گرفته تا ابزارهای غیر برقی مثل
                  ابزار دستی، نردبان، اره و مجموعه ابزار، این دسته برای هر نیازی
                  ابزار مناسب را ارائه می‌دهد. همچنین کمپرسور هوا، دستگاه جوش،
                  هویه و ابزار برش و تراشکاری برای انجام کارهای دقیق صنعتی موجود
                  است. به‌علاوه انواع لوازم روانکاری، چسب صنعتی، پیچ و مهره،
                  ماسک تنفسی، لوازم ایمنی و کار و شیرآلات به تکمیل نیازهای شما
                  برای کارهای ساختمانی و صنعتی کمک می‌کند. دیجی کالا یک راهکار
                  کامل برای پروژه‌های حرفه‌ای و خانگی است.
                </p>
                <h3>پوشاک</h3>
                <p>
                  &nbsp;از لباس‌های مردانه شامل هودی، سویشرت، ژاکت، پیراهن،
                  شلوار جین، پالتو، کاپشن، کفش و اکسسوری تا پوشاک زنانه نظیر
                  مانتو، بلوز، تیشرت، لباس مجلسی، لباس خواب، کاپشن و کفش زنانه،
                  همگی در این دسته‌بندی موجود هستند. همچنین برای بچگانه‌ها، از
                  لباس‌های راحتی و خواب، پوشاک ورزشی تا کفش و صندل بچگانه،
                  به‌راحتی می‌توانید کالای مناسب را پیدا کنید. این بخش شامل
                  برندهای معتبر مانند هامتو، چرم مشهد، اسمارا، کروم، گردیه و چرم
                  عطارد است که پوشاک با کیفیت بالا را ارائه می‌دهند.{" "}
                  <a href="https://www.digikala.com/landing/apparel/">
                    خرید آنلاین لباس
                  </a>{" "}
                  از دیجی کالا فرصتی برای همه فروشنده های شناخته شده کشور فراهم
                  کرده است تا فروش اینترنتی بیشتری را تجربه کنند. همچنین شما
                  کاربران می‌توانید طیف وسیعی از پوشاک و
                  <a href="https://www.digikala.com/landing/watches/">
                    {" "}
                    انواع ساعت برند
                  </a>{" "}
                  را به راحتی و از طریق پروفایل همیشگی خود در Digikala خریداری
                  کنید.&nbsp;
                </p>
                <h3>تجهیزات پزشکی و سلامت</h3>
                <p>
                  در این بخش از تجهیزات پزشکی مانند فشارسنج، ترازو، تب سنج و
                  دماسنج گرفته تا دستگاه‌های تنفسی و تجهیزات حرفه‌ای پزشکی،
                  موجود هستند. برای کنترل بیماری‌هایی مانند دیابت و سرماخوردگی،
                  محصولات مناسبی از جمله کیسه نمک، رطوبت‌گیر، و دستگاه‌های تب
                  سنج ارائه می‌شود. علاوه بر این، ماساژور و پد و کیسه آب گرم به
                  شما کمک می‌کنند تا در خانه از تسکین درد و آرامش بیشتری
                  برخوردار شوید.
                </p>
                <h3>محصولات ورزشی و سفر</h3>
                <p>
                  دیجی کالا همچنین برای علاقه‌مندان به ورزش و سفر، محصولات
                  متنوعی را در دسته‌بندی‌های مختلف ارائه می‌دهد. اگر به دنبال
                  خرید وسایل ورزشی برای بدنسازی، ورزش‌های هوازی، یا کمپینگ
                  هستید، دیجی کالا مجموعه‌ای از لوازم ورزشی از جمله وزنه، ساک
                  ورزشی، قمقمه و بسیاری از لوازم دیگر را ارائه می‌دهد. همچنین
                  شما می‌توانید برای سفرهای خود، ساک‌های مسافرتی، کوله پشتی‌های
                  کوهنوردی و لوازم کمپینگ را از این فروشگاه خریداری کنید.
                </p>
                <h3>کارت هدیه</h3>
                <p>
                  کارت هدیه‌ها راهی عالی برای هدیه دادن به عزیزانتان هستند و در
                  دیجی کالا انواع مختلفی از آنها برای مناسبت‌های گوناگون وجود
                  دارد. شما می‌توانید کارت هدیه فیزیکی دیجی کالا را به صورت
                  عمومی یا براساس مناسبت‌های خاص همچون تولد یا سالگرد خریداری
                  کنید. همچنین، کارت هدیه براساس قیمت امکان انتخاب هدیه‌ای مناسب
                  با بودجه شما را فراهم می‌کند. علاوه بر کارت‌های فیزیکی، کارت
                  هدیه الکترونیکی دیجی کالا هم برای افرادی که به دنبال یک گزینه
                  سریع و آسان هستند، وجود دارد.
                </p>
                <h3>مکمل های غذایی</h3>
                <p>
                  دیجی کالا همچنین به عنوان یکی از مراجع معتبر برای خرید{" "}
                  <a href="https://www.digikala.com/search/category-sports-and_fitness-supplements/">
                    مکمل
                  </a>{" "}
                  نیز شناخته می‌شود. شما می‌توانید انواع قرص‌های ویتامین،{" "}
                  <a href="https://www.digikala.com/search/facet/category-medical-supplement/type-of-vitamins-and-minerals-magnesium/">
                    منيزيم
                  </a>
                  ،{" "}
                  <a href="https://www.digikala.com/search/facet/category-medical-supplement/type-of-vitamins-and-minerals-zink/">
                    زينك
                  </a>
                  ، ويتامين C و بسیاری از مکمل‌های دیگر را از برندهای معروف و
                  معتبر در دیجی کالا پیدا کنید. این مکمل‌ها به سلامت شما کمک
                  می‌کنند و برای تقویت سیستم ایمنی بدن یا افزایش انرژی و بهبود
                  وضعیت پوست و مو مفید هستند.
                </p>
                <h3>خرید کالاهای کارکرده</h3>
                <p>
                  <a href="https://www.digikala.com/main/used-products/">
                    خرید کالاهای کارکرده
                  </a>{" "}
                  از دیجی کالا فرصتی عالی برای دسترسی به محصولات با کیفیت و قیمت
                  مناسب است. تمامی کالاهای این دسته‌بندی در وضعیت مشابه‌نو قرار
                  دارند و از نظر فنی و ظاهری کاملا سالم و بدون نقص هستند. همچنین
                  هر کالای کارکرده‌ای که خریداری می‌کنید، دارای 7 روز مهلت تست و
                  ضمانت اصالت است تا شما با خیال راحت از خرید خود اطمینان حاصل
                  کنید. برای گوشی‌های موبایل کارکرده، این فروشگاه 3 ماه گارانتی
                  دیجی کالا سرویس نیز ارائه می‌دهد. از جمله کالاهای کارکرده‌ای
                  که می‌توانید در این دسته پیدا کنید می‌توان به گوشی موبایل
                  کارکرده، لپ تاپ کارکرده، کنسول خانگی کارکرده و ساعت هوشمند
                  کارکرده اشاره کرد. این محصولات با قیمت‌های به‌صرفه، گزینه‌ای
                  مناسب برای کسانی است که به دنبال خرید کالاهای با کیفیت و در
                  عین حال اقتصادی هستند.
                </p>
                <p>
                  در آخر باید گفت خرید از دیجی کالا به دلیل تنوع بالای محصولات،
                  خدمات ارسال سریع، تخفیف‌های ویژه، و امکان خرید آنلاین کالاهای
                  متنوع از برندهای معتبر، یکی از بهترین انتخاب‌ها برای خریداران
                  آنلاین در ایران است. با استفاده از خدمات دیجی کالا، خریدی
                  مطمئن، سریع و راحت را تجربه خواهید کرد.
                </p>
                <p>&nbsp;</p>
              </div>
              <span
                className={styles.footer_seo__content_more}
                onClick={() => setAboutUsContent((prevState) => !prevState)}
              >
                <span>
                  <div className="d-flex align-items-center justify-content-center user-select-none">
                    {aboutUsContent ? "بستن" : "مشاهده بیشتر"}
                    <svg className={styles.footer_seo__content_icon}>
                      <use href="#chevronLeft"></use>
                    </svg>
                  </div>
                </span>
              </span>
            </div>

            <div className={styles.footer_license_container}>
              <div className={styles.footer_license}>
                <div className={styles.footer_license_img_container}>
                  <picture>
                    <source type="image/webp" srcSet="/images/png/sapra.webp" />
                    <source type="image/jpeg" srcSet="/images/png/sapra.png" />
                    <img
                      className={styles.footer_license_img}
                      src="/statics/img/png/sapra.png"
                      width="75"
                      height="75"
                      alt="سامانه پایش مردمی رسانه‌های صوت و تصویر"
                      title=""
                    ></img>
                  </picture>
                </div>
              </div>
              <div className={styles.footer_license}>
                <div className={styles.footer_license_img_container}>
                  <picture>
                    <source type="image/webp" srcSet="/images/png/rezi.webp" />
                    <source type="image/jpeg" srcSet="/images/png/rezi.png" />
                    <img
                      className={styles.footer_license_img}
                      src="/images/png/rezi.png"
                      width="75"
                      height="75"
                      alt="نشان ملی ثبت"
                      title=""
                    />
                  </picture>
                </div>
              </div>
              <div className={styles.footer_license}>
                <div className={styles.footer_license_img_container}>
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/png/kasbokar.webp"
                    />
                    <source
                      type="image/jpeg"
                      srcSet="/images/png/kasbokar.png"
                    />
                    <img
                      className={styles.footer_license_img}
                      src="/statics/img/png/kasbokar.png"
                      width="75"
                      height="75"
                      alt="نماد کسب و کار های مجازی"
                      title=""
                    ></img>
                  </picture>
                </div>
              </div>
              <div className={styles.footer_license}>
                <div className={styles.footer_license_img_container}>
                  <img
                    id="sScdOJOzhFxtcEqkjP7P"
                    referrerPolicy="origin"
                    className={styles.footer_license_img}
                    src="https://Trustseal.eNamad.ir/logo.aspx?id=19077&amp;Code=sScdOJOzhFxtcEqkjP7P"
                    width="75"
                    height="75"
                    alt="نماد اعتماد الکترونیک"
                    title=""
                  ></img>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.copyright}>
            برای استفاده از مطالب دیجی‌کالا، داشتن «هدف غیرتجاری» و ذکر «منبع»
            کافیست. تمام حقوق اين وب‌سايت نیز برای شرکت نوآوران فن آوازه
            (فروشگاه آنلاین دیجی‌کالا) است.
          </div>
        </div>
        <FooterPartners footerPartners={footerPartners} />
      </div>
    </div>
  );
}

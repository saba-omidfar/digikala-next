"use client";

import PlusFeaturesModal from "@/features/plus/modals/plusFeaturesModal/PlusFeaturesModal";
import MobilePlusFeaturesModal from "@/features/plus/modals/mobilePlusFeaturesModal/MobilePlusFeaturesModal";

import useScreenStatus from "@/hooks/useScreenStatus";

import { useModal } from "@/contexts/modalContext";

import styles from "./plusFeatures.module.css";

const features = [
  {
    type: "free-delivery",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/free-delivery-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/free-delivery-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/free-delivery-m.png",
    title: "ارسال سریع و رایگان",
    description:
      "<div>با خرید اشتراک پلاس، از «۴ ارسال رایگان دیجیکالا» برای همه کالاها و «۲ ارسال رایگان سوپرمارکت» مخصوص کالاهای سوپرمارکتی به ازای هر ماه اشتراک برخوردار شوید. ما در پلاس برای شما امکانات ویژه‌ای فراهم کردیم که تجربه‌ای بهتر، سریع‌تر و به‌صرفه‌تر از سایر کاربران دیجی‌کالا داشته باشید. شما مشتری ویژه دیجی‌کالا هستید و بسته‌بندی مرسولات شما با رنگ بنفش ویژه مشتریان پلاس متمایز شده است.<div style=\"font-size: 14px; font-weight: 600; color:#424242; text-align: center; margin-top: 24px\">شرایط استفاده </div><ul style='padding-right: 20px'><li style='list-style-type: disc'>ارسال رایگان پلاس برای محصولاتی که نوع ارسال آن‌ها «ارسال فروشنده» است، اعمال نمی‌شود. (این محصولات در انبار دیجی‌کالا موجود نیست و فروشنده آن‌‌ها را از طریق پست ارسال می‌کند.)</li><li style='list-style-type: disc'>ارسال دیجی‌کالا از انبار فروشنده مشمول مزایای پلاس می‌شود.</li><li style='list-style-type: disc'>پلاس تضمین می‌کند که سفارش‌های شما به موقع و به صورت رایگان تحویل داده شوند. در طول اشتراک پلاس اگر سفارش شما در روزی غیر از روز تعیین شده در جزئیات سفارش تحویل داده شود، یک ارسال رایگان به اشتراک شما اضافه خواهد شد.</li><li style='list-style-type: disc'>سفارش‌ سوپرمارکت کمتر از ۱۵۰ هزار تومان، شامل ارسال رایگان نخواهد شد.</li><li style='list-style-type: disc'>توجه داشته باشید: هزینه ارسال سفارش‌هایی با شرایط زیر برای همه کاربران دیجی‌کالا رایگان است و در این شرایط از ظرفیت ارسال‌های رایگان کاربران پلاس نیز کم نمی‌شود. شرایط سفارش‌های با ارسال رایگان دیجی‌کالا:<div>۱- سفارش‌های بیشتر از یک میلیون تومان از سوپرمارکت دیجی‌کالا، که شامل ارسال رایگان است.</div><div>۲- استفاده از کد تخفیف ارسال رایگان.</div><div>۳- بازه‌های تحویل پیشنهادی از دیجی‌کالا که در آن بازه‌ها ارسال شما رایگان می‌شود.</div></li></ul></div>",
    subTitle:
      "۴ ارسال رایگان ماهانه (به جز ارسال فروشنده و ارسال باربری شهرستان)",
  },
  {
    type: "fresh-free-delivery",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/fresh-free-delivery-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/fresh-free-delivery-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/fresh-free-delivery-m.png",
    title: "ارسال رایگان سوپرمارکت",
    subTitle:
      "۲ ارسال رایگان ماهانه برای سفارش‌های سوپرمارکتی در شهر تهران و کرج",
    description:
      "به عنوان عضو پلاس، هر ماه از دو ارسال رایگان بیشتر برای سفارش‌های سوپرمارکتی خود بهره‌مند شوید! با خرید حداقل ۱۵۰ هزار تومان از دسته‌بندی سوپرمارکتی در شهرهای تهران و کرج، می‌توانید بدون پرداخت هزینه ارسال، سفارش‌های خود را در منزل دریافت کنید. این مزیت ویژه به شما امکان می‌دهد تا به‌صورت اقتصادی و بدون نگرانی از هزینه ارسال، خریدهای روزمره خود را انجام دهید. با پلاس، خریدهای سوپرمارکتی‌تان راحت‌تر و مقرون‌به‌صرفه‌تر از همیشه خواهد بود!",
  },
  {
    type: "jet-free-delivery",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/jet-free-delivery-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/jet-free-delivery-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/jet-free-delivery-m.png",
    title: "ارسال رایگان ۴۵ دقیقه‌ای",
    subTitle:
      "۴ ارسال رایگان در هر ماه برای سفارش‌های سوپرمارکت فوری دیجی‌کالا",
    description:
      "به عنوان عضو پلاس، در هر ماه می‌توانید از ۴ ارسال رایگان برای خریدهای سوپرمارکتی خود بهره‌مند شوید. کافیست با خرید حداقل ۱۵۰,۰۰۰ تومان از دسته‌بندی سوپرمارکتی، سفارش‌های خود را بدون پرداخت هزینه ارسال در کمتر از ۴۵ دقیقه‌ای درب منزل دریافت کنید.\nاین مزیت ویژه برای کاربران در شهرهای تحت پوشش ارسال سوپرمارکتی ۴۵ دقیقه‌ای، از جمله تهران و کرج، فراهم شده است.",
  },
  {
    type: "return",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/return-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/return-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/return-m.png",
    title: "۳۰ روز ضمانت بازگشت کالا",
    subTitle: "مهلت بیشتر برای بازگشت کالا به صورت کاملا رایگان",
    description:
      "به عنوان عضو پلاس، شما از ضمانت ۳۰ روزه بازگشت کالا برخوردار خواهید بود که این مدت در مقایسه با استاندارد ۷ روزه بازگشت کالا در دیجی‌کالا بسیار بیشتر است. این مزیت به شما فرصت کافی را خواهد داد تا کالای خریداری شده را بررسی کرده و در صورت عدم رضایت، آن را بدون هیچ‌گونه نگرانی و به‌صورت رایگان بازگردانید. با پلاس خیالتان از خریدهای آنلاین راحت‌تر از همیشه خواهد بود.",
  },
  {
    type: "priority",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/priority-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/priority-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/priority-m.png",
    title: "بازه ارسال اختصاصی",
    subTitle: "اختصاص نزدیک‌ترین زمان ارسال فقط برای کاربران پلاس",
    description:
      "با عضویت در پلاس، کالاهای خود را سریع‌تر از دیگران دریافت خواهید کرد. این مزیت به معنی ارائه ظرفیت ویژه برای اطمینان از ارسال سریع‌تر کالاها در بازه‌های زمانی کوتاه‌تر به کاربران پلاس است.",
  },
  {
    type: "amazing",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/amazing-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/amazing-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/amazing-m.png",
    title: "شگفت‌انگیز پلاس",
    subTitle:
      "دسترسی به کالاهای شگفت‌انگیز با تخفیف‌های اختصاصی و بیشتر، ویژه کاربران پلاس",
    description:
      "با عضویت در پلاس، به دنیایی از تخفیف‌های اختصاصی و پیشنهادات شگفت‌انگیز پلاس دسترسی پیدا می‌کنید که تنها برای اعضای پلاس در نظر گرفته شده. تخفیف‌های استثنایی روی محصولات محبوب و پرفروش، فرصتی استثنایی برای خرید کالاهای مورد نیازتان با قیمت‌های استثنائی است. با پلاس، هر خرید تبدیل به یک فرصت شگفت‌انگیز خواهد شد!",
  },
  {
    type: "early-access",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/early-access-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/early-access-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/early-access-m.png",
    title: "دسترسی زودتر به «شگفت‌انگیزها»",
    subTitle:
      "دسترسی به کالاهای «شگفت‌انگیزها» در دیجی‌کالا یک ساعت زودتر از بقیه (هر شب ساعت ۲۳)",
    description:
      "به عنوان عضو پلاس، شما همیشه یک قدم جلوتر از دیگران خواهید بود! با دسترسی زودتر به کالاهای بخش «شگفت‌انگیزها»، هر شب یک ساعت قبل از دیگران (ساعت ۲۳)، بهترین پیشنهادها را مشاهده و خریداری کنید، هیچ تخفیفی را از دست ندهید و همیشه اولین نفری باشید که از تخفیف‌های هیجان‌انگیز بهره‌مند می‌شود. این مزیت به شما کمک می‌کند تا پیش از اتمام موجودی یا افزایش قیمت‌ها، کالای مورد نظر خود را با تخفیف‌های ویژه خریداری کنید.",
  },
  {
    type: "offline-shop",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/offline-shop-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/offline-shop-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/offline-shop-m.png",
    title: "تخفیف فروشگاه حضوری دیجی‌کالا",
    subTitle:
      "تخفیف ویژه کاربران پلاس در خرید خدمات از فروشگاه حضوری دیجی‌کالا، متناسب با مبلغ سبد خرید",
    description:
      "با عضویت در پلاس، امکان بهره‌مندی از تخفیف ویژه برای خرید از دسته‌بندی خدمات (انواع نصب نرم‌افزار و ویندوز، انتقال اطلاعات، اپل‌آیدی و..) در خرید از فروشگاه حضوری دیجی‌کالا فراهم می‌شود. میزان تخفیف براساس طرح عضویت شما بین ۱۵۰,۰۰۰ تومان تا ۱,۵۰۰,۰۰۰ تومان متغیر است.",
  },
  {
    type: "cashback",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/cashback-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/cashback-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/cashback-m.png",
    title: "هدیه نقدی",
    subTitle:
      "بازگشت بخشی از مبلغ سفارش به کیف پول شما برای کالاهای دارای نشان هدیه نقدی",
    description:
      "در عضویت پلاس، می‌توانید از هدیه نقدی بهره‌مند شوید. با استفاده از این مزیت، با سفارش کالاهایی که دارای نشان هدیه نقدی هستند، بخشی از مبلغ سفارش به کیف پول شما باز می‌گردد. با امکان هدیه نقدی پلاس، می‌توانید علاوه بر تخفیف‌های معمول، سود بیشتری از خریدتان در دیجی کالا داشته باشید. با پلاس خریدهایتان همیشه ارزش بیشتری دارد!",
  },
  {
    type: "support",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/support-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/support-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/support-m.png",
    title: "پشتیبانی اختصاصی",
    subTitle: "رسیدگی ویژه و خارج از نوبت به درخواست‌ها و تماس‌های شما",
    description:
      "به عنوان عضو پلاس، شما از پشتیبانی اختصاصی و ویژه بهره‌مند خواهید شد. هر زمان که نیاز به کمک داشتید تیم پشتیبانی پلاس، با اولویت و خارج از نوبت به درخواست شما رسیدگی می‌کنند. با این مزیت، خیالتان راحت خواهد بود که مشکلات و سوالات شما در سریع‌ترین زمان ممکن حل می‌شود. با پلاس، پشت خط منتظر نمی‌مانید!",
  },
  {
    type: "fidiplus",
    image:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/fidiplus-bg.png",
    icon: "https://www.digikala.com/statics/img/png/digiplus/landing/perks/fidiplus-d.png",
    mobileIcon:
      "https://www.digikala.com/statics/img/png/digiplus/landing/perks/fidiplus-m.png",
    title: "اشتراک فیدی‌پلاس",
    subTitle: "دسترسی به هزاران کتاب صوتی و الکترونیکی در فیدیبو برای شما",
    description:
      "با عضویت در پلاس، از اشتراک ویژه فیدی‌پلاس در فیدیبو بهره‌مند می‌شوید! با این اشتراک اختصاصی، به دنیایی از کتاب‌های الکترونیکی و صوتی دسترسی خواهید داشت و می‌توانید از تخفیف‌های ویژه و پیشنهادهای اختصاصی فیدیبو استفاده کنید. پلاس، تجربه‌ای فراتر از خرید آنلاین!",
  },
];

export default function PlusFeatures() {
  const { isSmallScreen } = useScreenStatus();
  const { openModal } = useModal();

  const handleOpenModal = () => {
    if (isSmallScreen) {
      openModal(<MobilePlusFeaturesModal features={features} />, {
        name: "plus-features-mobile",
        size: "full",
      });
    } else {
      openModal(<PlusFeaturesModal features={features} />, {
        name: "plus-features",
        className: "modal__plus_features rounded-medium",
      });
    }
  };

  return (
    <div className={styles.content}>
      <h2 className={styles.header}>چرا اشتراک پلاس بخریم؟</h2>
      <div className={styles.features_container}>
        {features?.map((feature) => (
          <div
            key={feature.type}
            className={styles.feature_box}
            onClick={handleOpenModal}
          >
            <div className={styles.feature}>
              <div
                className={styles.feature_img_container}
                role="img"
                aria-hidden="false"
                aria-label="icon"
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet={isSmallScreen ? feature.mobileIcon : feature.icon}
                  />
                  <source
                    type="image/jpeg"
                    srcSet={isSmallScreen ? feature.mobileIcon : feature.icon}
                  />
                  <img
                    className={styles.feature_img}
                    src={isSmallScreen ? feature.mobileIcon : feature.icon}
                    width={isSmallScreen ? 48 : 104}
                    height={isSmallScreen ? 48 : 104}
                    alt="icon"
                    title=""
                  />
                </picture>
              </div>
              <div className={styles.feature_text}>
                <h3 className={styles.feature_title}>{feature.title}</h3>
                <div className={styles.feature_description}>
                  {feature.subTitle}
                </div>
              </div>
              <div className={styles.feature_btn}>
                <span className={styles.feature_btn_text}>مشاهده</span>
                <div
                  className={styles.feature_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.feature_icon}>
                    <use href="#chevronLeft"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

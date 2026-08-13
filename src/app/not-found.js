// "use client";

// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import dynamicImport from "next/dynamic";

// import useScreenStatus from "@/hooks/useScreenStatus";
// import styles from "@/styles/notFound.module.css";

// const Header = dynamicImport(
//   () => import("@/components/modules/header/Header"),
//   { ssr: false }
// );
// const MobileStickyHeader = dynamicImport(
//   () => import("@/components/modules/mobileStickyHeader/MobileStickyHeader"),
//   { ssr: false }
// );
// const MenuMobile = dynamicImport(
//   () => import("@/components/modules/menuMobile/MenuMobile"),
//   { ssr: false }
// );
// const ModalWrapper = dynamicImport(
//   () => import("@/components/modals/ModalWrapper"),
//   { ssr: false }
// );
// const Footer = dynamicImport(
//   () => import("@/components/modules/footer/Footer"),
//   { ssr: false }
// );

// function NotFoundPage() {
//   const isSmallScreen = false;
//   const isSmallMobile = false;

//   return (
//     <>
//       <ModalWrapper />

//       <div
//         className="d-flex flex-columnf flex-grow-1"
//         style={{
//           paddingBottom: isSmallScreen
//             ? isSmallMobile
//               ? "50px"
//               : "55px"
//             : "0",
//           paddingTop: isSmallScreen ? "64px" : "108px",
//         }}
//       >
//         {isSmallScreen ? <MobileStickyHeader /> : <Header />}

//         <div className={styles.not_found_container}>
//           <div className={styles.not_found}>
//             <h2 className={styles.not_found_title}>
//               صفحه‌ای که دنبال آن بودید پیدا نشد!
//             </h2>

//             <Link className={styles.not_found_link} href="/">
//               <span>صفحه اصلی</span>
//               <div className="d-flex">
//                 <div
//                   data-icon-name="cube-chevron-left"
//                   data-icon="&#xE9C2;"
//                   className={`${styles.not_found_icon} cube-font-icon`}
//                 ></div>
//               </div>
//             </Link>

//             <div className={styles.not_found_logo}>
//               <div className={styles.not_found_img_container}>
//                 <Image
//                   fill
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                   src="/images/png/page-not-dound.webp"
//                   alt="error 404"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//       <MenuMobile className="mt-4" />
//     </>
//   );
// }

// export default NotFoundPage;

"use client";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "100px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        صفحه مورد نظر یافت نشد!
      </h1>

      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          fontSize: "18px",
          textDecoration: "underline",
        }}
      >
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
}

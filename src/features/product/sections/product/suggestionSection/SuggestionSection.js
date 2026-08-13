// import { useState, useEffect, useRef } from "react";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// import SimilarProductsSlider from "../similarProductsSlider/SimilarProductsSlider";

// import { useProductContext } from "@/contexts/ProductContext";
// import useScreenStatus from "@/hooks/useScreenStatus";
// import { useProductTabularRecommendation } from "@/hooks/useProduct";

// import styles from "./suggestionSection.module.css";

// function SuggestionSection({ productId, offset }) {
//   const { activeOffset, setActiveOffset } = useProductContext();
//   const { data: tabularRecommendation, isLoadingTabularRecommendation } =
//     useProductTabularRecommendation(productId, offset);

//   const { width } = useScreenStatus();
//   const tabContainerRef = useRef(null);
//   const similarProductsRef = useRef(null);
//   const tabRefs = useRef([]);
//   const [showSimilarProductsTitle, setShowSimilarProductsTitle] =
//     useState(false);

//   const activeOffsetData =
//     activeOffset &&
//     tabularRecommendation?.meta?.offsets?.find(
//       (item) => item?.offset === activeOffset,
//     )?.offset;

//   useEffect(() => {
//     if (!tabContainerRef.current || !tabRefs.current[activeOffsetData]) return;

//     const containerRect = tabContainerRef.current.getBoundingClientRect();
//     const activeRect =
//       tabRefs.current[activeOffsetData].getBoundingClientRect();

//     const scrollLeft =
//       activeRect.left -
//       containerRect.left +
//       tabContainerRef.current.scrollLeft -
//       containerRect.width / 2 +
//       activeRect.width / 2;

//     tabContainerRef.current.scrollTo({
//       left: scrollLeft,
//       behavior: "smooth",
//     });
//   }, [activeOffsetData]);

//   const stickyTabsHeight = 40;

//   useEffect(() => {
//     const setupTrigger = () => {
//       if (!similarProductsRef.current) return;

//       const trigger = ScrollTrigger.create({
//         trigger: similarProductsRef.current,
//         start: "top",
//         onEnter: () => setShowSimilarProductsTitle(true),
//         onLeaveBack: () => setShowSimilarProductsTitle(false),
//       });

//       return () => trigger.kill();
//     };

//     let rafId = requestAnimationFrame(setupTrigger);

//     return () => cancelAnimationFrame(rafId);
//   }, []);

//   if (!tabularRecommendation?.data?.products || isLoadingTabularRecommendation)
//     return null;

//   return (
//     <section id="SUGGESTION" style={{ minHeight: "100vh" }}>
//       <hr className="line-8" />
//       <div className="lazyload-wrapper">
//         <div>
//           <div className="w-100 z-3 py-2 bg-white">
//             {/* <div
//               style={{
//                 height: showSimilarProductsTitle ? "40px" : "",
//               }}
//             ></div> */}
//             <h3
//               id="similarProducts"
//               ref={similarProductsRef}
//               className={styles.our_suggestions_title}
//             >
//               پیشنهاد ما
//             </h3>
//             <div
//               ref={tabContainerRef}
//               className={
//                 showSimilarProductsTitle
//                   ? styles.similar_products_title_container_fixed
//                   : styles.similar_products_title_container
//               }
//             >
//               <div style={{ height: "4px", paddingRight: "8px" }}></div>
//               {tabularRecommendation?.meta?.offsets?.map((item, index) => (
//                 <div key={item?.offset} className="d-flex py-1">
//                   <div
//                     ref={(el) => (tabRefs.current[index] = el)}
//                     className={`${styles.similar_products_title}
//                     ${
//                       activeOffsetData === item?.offset
//                         ? styles.similar_products_title__active
//                         : ""
//                     }
//                     `}
//                     onClick={() => {
//                       setActiveOffset(item?.offset);
//                       if (similarProductsRef.current) {
//                         const rect =
//                           similarProductsRef.current.getBoundingClientRect();
//                         const scrollTop =
//                           window.scrollY || document.documentElement.scrollTop;

//                         window.scrollTo({
//                           top: rect.top + scrollTop - 90,
//                           behavior: "smooth",
//                         });
//                       }
//                     }}
//                   >
//                     {item?.title}
//                   </div>
//                 </div>
//               ))}

//               <div style={{ height: "4px", paddingRight: "8px" }}></div>
//             </div>
//           </div>
//           <div
//             className={styles.tabs_container__top}
//             id="tabs-container--top"
//             style={{ width: `${width}px` }}
//           >
//             <div className="position-relative">
//               <div>
//                 <SimilarProductsSlider width={width} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SuggestionSection;

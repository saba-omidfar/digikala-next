// import Image from "next/image";

// import Timer from "@/components/modules/timer/Timer";
// import DigiplusModal from "@/components/modals/digiplusModal/DigiplusModal";

// import { useModal } from "@/contexts/modalContext";
// import useScreenStatus from "@/hooks/useScreenStatus";

// import styles from "./digiplus.module.css";

// function Digiplus() {
//   const { openModal } = useModal();
//   const { isSmallScreen } = useScreenStatus();

//   return (
//     <div
//       id="plus-carousel-incredible"
//       className={styles.content}
//       onClick={() => openModal(<DigiplusModal />, { name: "digiplus" })}
//     >
//       <span className={styles.plus_container}>
//         <div className={styles.plus_bg}></div>
//         <div className={styles.plus_teasing_early_access}></div>
//         <div className="d-flex flex-column align-items-center">
//           {isSmallScreen ? (
//             <div className={styles.plus_title_container}>
//               <div className={styles.plus_icon_container}>
//                 <div
//                   data-icon-name="cube-plus"
//                   data-icon="&#xE9B4;"
//                   className={`${styles.plus_icon} cube-font-icon`}
//                 ></div>
//               </div>
//               <span className={styles.plus_title}>ویژه اعضای پلاس</span>
//             </div>
//           ) : (
//             ""
//           )}
//           <div className={styles.plus_logo_container}>
//             <Image
//               width={isSmallScreen ? 309 : 461}
//               height={isSmallScreen ? 144 : 83}
//               src={
//                 isSmallScreen
//                   ? "/images/svg/typography/earlyAccessTeasingMobile.svg"
//                   : "/images/svg/typography/earlyAccessTeasing.svg"
//               }
//               alt=""
//               className={styles.plus_logo}
//             />
//           </div>
//         </div>
//         <div className={styles.plus_infos_container}>
//           <div className={styles.plus_infos}>
//             {!isSmallScreen ? (
//               <div className={styles.plus_title_container}>
//                 <div className={styles.plus_icon_container}>
//                   <div
//                     data-icon-name="cube-plus"
//                     data-icon="&#xE9B4;"
//                     className={`${styles.plus_icon} cube-font-icon`}
//                   ></div>
//                 </div>
//                 <span className={styles.plus_title}>ویژه اعضای پلاس</span>
//               </div>
//             ) : (
//               ""
//             )}
//             <div className={styles.plus_timer_container}>
//               <Timer seconds="58434" hasBg />
//               <span className={styles.plus_timer_text}>مانده تا شروع</span>
//               <div className={styles.plus_timer_icon_container}>
//                 <div
//                   data-icon-name="cube-plus"
//                   data-icon="&#xE940;"
//                   className={`${styles.plus_timer_icon} cube-font-icon`}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </span>
//     </div>
//   );
// }
// export default Digiplus;

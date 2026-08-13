// import React from "react";

// import FilterCategoriesContent from "./filterContent/filterCategoriesContent/FilterCategoriesContent";
// import FilterPriceContent from "./filterContent/filterPriceContent/FilterPriceContent";
// import FilterBrandsContent from "./filterContent/filterBrandsContent/FilterBrandsContent";
// import FilterSellerContent from "./filterContent/filterSellerContent/FilterSellerContent";

// import { useModal } from "@/contexts/modalContext";
// import { useListing } from "@/contexts/FiltersContext";

// import ColorPallete from "@/components/modals/filterModal/filterContent/filterColorsContent/ColorPallete";
// import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";

// import styles from "./FilterContent.module.css";

// function FilterModalContent() {
//   const { openModal } = useModal();
//   const {
//     filterExtra,
//     params,
//     searchItemValue,
//     setSearchItemValue,
//     filterCheckboxChangeHandler,
//   } = useListing();

//   if (!filterExtra.isOpen) return null;

//   const key =
//     typeof filterExtra.filterKey === "string"
//       ? filterExtra.filterKey
//       : filterExtra.filterKey.keyCode;

//   const selectedItems = filterExtra?.filterOptions.filter((item) =>
//     params[key]?.some((b) => String(b) === String(item.filterOptionId))
//   );

//   if (key === "color_palettes") {
//     return (
//       <div>
//         <div className={styles.color_palettes_container}>
//           {filterExtra.filterOptions?.map((filter) => (
//             <ColorPallete key={filter.filterOptionId} filter={filter} />
//           ))}
//         </div>
//         <div>
//           <div
//             id="color-filter-detail"
//             className={styles.color_palettes_details_container}
//             onClick={() =>
//               openModal(
//                 "colorPalletesDetails",
//                 <ColorPalletesDetailsModal
//                   colorPalettes={filterExtra.filterOptions}
//                 />
//               )
//             }
//           >
//             <div className={styles.color_palettes_icon_container}>
//               <div
//                 data-icon-name="cube-info_outline"
//                 data-icon="&#xE940;"
//                 className={`${styles.color_palettes_icon} cube-font-icon`}
//               ></div>
//             </div>
//             جزییات رنگ‌ها
//             <div className="d-flex me-auto">
//               <div
//                 data-icon-name="cube-chevron-left"
//                 data-icon="&#xE9C2;"
//                 className={`${styles.chevron_icon} cube-font-icon`}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.filter_items_container}>
//       {filterExtra.filterItem.showSearch ? (
//         <form className={styles.filter_items_form}>
//           <label htmlFor="#" className="d-inline-block w-100">
//             <div className={styles.filter_items_input_container}>
//               {!searchItemValue ? (
//                 <div className={styles.filter_items_input_icon_container}>
//                   <div
//                     data-icon-name="cube-search"
//                     data-icon="&#xE91F;"
//                     className={`${styles.filter_items_input_icon} cube-font-icon`}
//                   ></div>
//                 </div>
//               ) : null}
//               <div className="flex-grow-1">
//                 <input
//                   name="search"
//                   type="text"
//                   value={searchItemValue}
//                   placeholder={`جستجو ${filterExtra.filterTitle} ...`}
//                   className={styles.filter_items_input}
//                   onChange={(event) => setSearchItemValue(event.target.value)}
//                 />
//               </div>
//               {searchItemValue ? (
//                 <div className="d-flex" onClick={() => setSearchItemValue("")}>
//                   <div
//                     data-icon-name="cube-close"
//                     data-icon="&#xE96D;"
//                     className={`${styles.clear_icon} cube-font-icon`}
//                   ></div>
//                 </div>
//               ) : null}
//             </div>
//           </label>
//         </form>
//       ) : null}

//       {/* Selected Items By User */}
//       {params[key]?.length ? (
//         <>
//           <div className={styles.selected_items_title}>انتخاب شما</div>
//           {selectedItems?.map((item, index) => (
//             <CustomCheckBox
//               key={index}
//               id={item?.filterOptionId}
//               label={item?.filterOptionTitle}
//               engLabel={
//                 params[key] === "brands" ? item?.filterOptionTitleEn : ""
//               }
//               isLast={index === params[key].length - 1}
//               checked={!!params[key]?.includes(String(item.filterOptionId))}
//               changeHandler={(checked) =>
//                 filterCheckboxChangeHandler(
//                   key,
//                   String(item.filterOptionId),
//                   !checked
//                 )
//               }
//             />
//           ))}
//         </>
//       ) : null}

//       {/* All items */}
//       {params[key]?.length ? (
//         <div className={styles.selected_items_title}>
//           همه‌ی {filterExtra.filterTitle}ها
//         </div>
//       ) : null}

//       {filterExtra?.filterOptions
//         .filter(
//           (item) =>
//             !searchItemValue || item.filterOptionTitle.includes(searchItemValue)
//         )
//         .map((filter, index) => (
//           <CustomCheckBox
//             key={index}
//             id={filter?.filterOptionId}
//             label={filter?.filterOptionTitle}
//             isLast={index === filterExtra?.filterOptions.length - 1}
//             checked={!!params[key]?.includes(String(filter.filterOptionId))}
//             changeHandler={(checked) =>
//               filterCheckboxChangeHandler(
//                 key,
//                 String(filter.filterOptionId),
//                 !checked
//               )
//             }
//           />
//         ))}
//     </div>
//   );

//   // switch (filterExtra.filterKey) {
//   //   case "price":
//   //     return <FilterPriceContent filterItem={filterExtra.filterItem} />;
//   //   case "categories":
//   //     return <FilterCategoriesContent />;
//   //   case "brands":
//   //     return <FilterBrandsContent />;
//   //   case "seller_types":
//   //     return <FilterSellerContent />;
//   //   default:
//   //     return null;
//   // }
// }

// export default FilterModalContent;

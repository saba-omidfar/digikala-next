import { useModal } from "@/contexts/modalContext";
import { useListing } from "@/contexts/ListingContext";

import ColorPallete from "./ColorPallete";
import ColorPalletesDetailsModal from "@/features/search/modals/colorPalletesDetailsModal/ColorPalletesDetailsModal";

import styles from "./filterColorsContent.module.css";

export default function FilterColorsContent() {
  const { openModal } = useModal();
  const { filterExtra } = useListing();

  if (!filterExtra.isOpen) return null;

  return (
    <div>
      <div className={styles.color_palettes_container}>
        {filterExtra.filterOptions?.map((filter) => (
          <ColorPallete key={filter.id} filter={filter} />
        ))}
      </div>
      <div>
        <div
          id="color-filter-detail"
          className={styles.color_palettes_details_container}
          onClick={() =>
            openModal(
              <ColorPalletesDetailsModal
                colorPalettes={filterExtra.filterOptions}
              />,
              { name: "colorPalletesDetails" },
            )
          }
        >
          <div
            className={styles.color_palettes_icon_container}
            aria-hidden="false"
          >
            <svg className={styles.color_palettes_icon}>
              <use href="#infoOutline"></use>
            </svg>
          </div>
          جزییات رنگ‌ها
          <div className="d-flex me-auto" aria-hidden="false">
            <svg className={styles.chevron_icon}>
              <use href="#chevronLeft"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

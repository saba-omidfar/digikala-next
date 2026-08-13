import Image from "next/image";

import { useListing } from "@/contexts/ListingContext";

import styles from "./filterColorsContent.module.css";

function ColorPallete({ filter }) {
  const { params, colorsPalleteSellectHandler } = useListing();

  const isColorSellected = params.color_palettes?.includes(String(filter?.id));

  return (
    <div
      id="color-filter-element"
      className={styles.color_palettes}
      onClick={() => colorsPalleteSellectHandler(filter)}
    >
      <div
        className={`${styles.color_palettes_img_container} ${
          isColorSellected && styles.color_palettes__selected
        }`}
      >
        <div className={styles.color_palettes_img}>
          <img
            className={styles.color_palette}
            src={filter?.image.url[0]}
            alt=""
            title=""
          />
        </div>
      </div>
      <p className={styles.color_palette_text}>{filter.title}</p>
    </div>
  );
}
export default ColorPallete;

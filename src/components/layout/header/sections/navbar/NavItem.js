import Link from "next/link";

import styles from "./navItem.module.css";
import useScreenStatus from "@/hooks/useScreenStatus";

function NavItem({ item }) {
  const { isSmallScreen } = useScreenStatus();

  if (item.isHiddenOnSmallerScreen && isSmallScreen) return null;

  if (item.url) {
    return (
      <div
        className={`${styles.digikala_nav_item} ${item.className} ${styles.digikala_nav_item_line}`}
      >
        <Link
          href={item.url}
          target={item.target}
          className={styles.digikala_nav_item_link}
        >
          {item.icon ? (
            item?.icon?.startsWith("cube") ? (
              <div className="d-flex ms-1">
                <div
                  data-icon-name={item.icon}
                  data-icon={String.fromCharCode(parseInt(item.iconCode, 16))}
                  className={`${styles.nav_icon} cube-font-icon`}
                ></div>
              </div>
            ) : (
              <div className={styles.nav_icon_container}>
                <svg className={styles.nav_icon}>
                  <use href={`#${item.icon}`}></use>
                </svg>
              </div>
            )
          ) : (
            ""
          )}
          {item.title}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`${styles.digikala_nav_megamenu_item} ${item.className} ${styles.digikala_nav_item_line}`}
    >
      <span className={styles.header_main_menu}>
        {item?.icon?.startsWith("cube") ? (
          <div className={styles.header_main_menu_icon_container}>
            <div
              data-icon-name={item.icon}
              data-icon={String.fromCharCode(parseInt(item.iconCode, 16))}
              className={`${styles.header_main_menu_icon} cube-font-icon`}
            ></div>
          </div>
        ) : (
          <div className={styles.header_main_menu_icon_container}>
            <svg className={styles.header_main_menu_icon}>
              <use href={`#${item.icon}`}></use>
            </svg>
          </div>
        )}
        {item.title}

        {item.isMegamenu ? <span className={styles.nav_space}></span> : ""}
      </span>
    </div>
  );
}

export default NavItem;

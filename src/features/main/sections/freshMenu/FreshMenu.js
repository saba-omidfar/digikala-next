import Link from "next/link";

import styles from "./freshMenu.module.css";

function FreshMenu({ fresh_menu }) {
  return (
    <div className={styles.container}>
      <div className="d-flex justify-content-start align-items-center">
        <div className="d-flex" aria-hidden="false">
          <svg className={styles.category_title_icon}>
            <use href="#fresh"></use>
          </svg>
        </div>
        <h2 className={styles.category_title}>کالای خوراکی و اساسی</h2>
      </div>
      <div className={styles.menus_container}>
        {fresh_menu?.items?.slice(1)?.map((item) => (
          <Link
            className={styles.menu_link}
            href={item?.uri ? item?.uri : "#"}
            key={item.title}
          >
            <div
              className={styles.menu_img_container}
              aria-hidden="true"
              aria-label=""
            >
              <img className={styles.menu_img} alt="" title="" />
            </div>
            <span style={{ color: item.color ? item.color : "" }}>
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FreshMenu;

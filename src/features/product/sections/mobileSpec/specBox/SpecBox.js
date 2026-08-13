import SpecList from "@/features/product/sections/specList/SpecList";

import { useModal } from "@/contexts/modalContext";

import styles from "./specBox.module.css";
function SpecBox() {
  const { openMobileModal } = useModal();

  const openSpecModal = () => {
    openMobileModal("spec-details", {
      initialTab: 2,
    });
  };

  return (
    <div className={styles.spec_container}>
      <div className={styles.spec_header}>
        <span className={styles.spec_title}>مشخصات کالا</span>
        <button
          className={styles.spec_see_all_btn}
          onClick={() => openSpecModal()}
        >
          <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
            <span className={styles.spec_see_all_btn_text}>
              مشاهده همه
              <div className="d-flex" aria-hidden="false">
                <div
                  className={`${styles.chevron_icon} cube-font-icon`}
                  data-icon-name="cube-nav-chevron-left"
                  data-icon=""
                ></div>
              </div>
            </span>
          </div>
        </button>
      </div>

      <SpecList />
    </div>
  );
}

export default SpecBox;

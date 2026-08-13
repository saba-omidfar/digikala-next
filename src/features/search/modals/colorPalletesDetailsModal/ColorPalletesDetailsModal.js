import Image from "next/image";

import { useModal } from "@/contexts/modalContext";

import styles from "./colorPalletesDetailsModal.module.css";

function ColorPalletesDetailsModal({ colorPalettes }) {
  const { closeModal } = useModal();

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div className={styles.modal_header_bb}>
          <div className={styles.modal_header_text_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.modal_header_text}>
                <span className="position-relative">جزییات رنگ‌ها</span>
              </p>
            </div>
            <div className={styles.modal_header_subtext}>
              زیر مجموعه‌های هر کدام از رنگ‌های موجود
            </div>
          </div>
          <div className="d-flex" onClick={() => closeModal()}>
            <div
              data-test-id="close-modal-icon-button"
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.close_icon} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column overflow-y-auto flex-grow-1">
        <div className={styles.modal_content_container}>
          <div className={styles.modal_content}>
            {colorPalettes?.map((colorPallete) => (
              <div key={colorPallete.id}>
                <div className="d-flex align-items-center">
                  <div className={styles.modal_content_img_container}>
                    <Image
                      className={styles.modal_content_img}
                      src={colorPallete.image.url[0]}
                      width={48}
                      height={18}
                      alt=""
                      title=""
                    />
                  </div>
                  <p className={styles.modal_content_title}>
                    {colorPallete.title}
                  </p>
                </div>
                <p className={styles.modal_content_description}>
                  {colorPallete.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ColorPalletesDetailsModal;

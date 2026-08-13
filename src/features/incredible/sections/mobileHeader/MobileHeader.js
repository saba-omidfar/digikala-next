import { useRouter } from "next/navigation";

import SearchModal from "@/components/layout/header/modals/searchModal/SearchModal";

import { useModal } from "@/contexts/modalContext";

import styles from "./mobileHeader.module.css";

export default function MobileHeader() {
  const router = useRouter();
  const { openModal } = useModal();

  const searchHandler = () => {
    openModal(<SearchModal />, {
      name: "search",
    });
  };

  const closeHandler = () => {
    router.push("/");
  };

  return (
    <div className={styles.header_container}>
      <div className="d-flex" aria-hidden="false">
        <svg className={styles.back_icon} onClick={closeHandler}>
          <use href="#arrowRight"></use>
        </svg>
      </div>
      <div aria-hidden="true" aria-label="">
        <img
          className={styles.header_bg_img}
          src="/statics/img/svg/amazing/text.svg"
          alt=""
          title=""
        />
      </div>
      <div className={styles.header_input_container}>
        <div className="w-100">
          <div>
            <div className="d-flex justify-content-between align-items-center"></div>
            <span onClick={searchHandler}>
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.search_icon}>
                  <use href="#searchSearch"></use>
                </svg>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

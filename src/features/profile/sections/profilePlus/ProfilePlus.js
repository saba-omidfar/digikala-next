"use client";
import { useDigiplus } from "@/features/profile/hooks/useDigiplus";

import { useModal } from "@/contexts/modalContext";

import PlusModal from "@/features/product/modals/plusModal/PlusModal";

import styles from "./profilePlus.module.css";

export default function ProfilePlus() {
  const { openModal } = useModal();
  const { data, isLoading } = useDigiplus();

  if (isLoading) return null;

  return (
    <div>
      <div className={styles.plus_header}>
        <div className="d-flex align-items-center flex-grow-1">
          <p className={styles.plus_title}>
            <span className="position-relative">پلاس</span>
          </p>
        </div>
      </div>
      <div
        className={styles.plus_content_container}
        onClick={() =>
          openModal(<PlusModal isProfilePage />, {
            name: "plus",
            className: "modal__plus rounded-medium",
          })
        }
      >
        <div className={styles.plus_content}>
          <div className={styles.card_inactive}>
            <div className="d-flex flex-column">
              <p className={styles.card_text}>{data?.subscription?.title}</p>
              <button className={styles.plus_btn} data-cro-id="profile-subs">
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  خرید اشتراک
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRouter } from "nextjs-toploader/app";

import { useModal } from "@/contexts/modalContext";

import styles from "./searchSaggestedBox.module.css";

function SearchSaggestedBox({ keyword, setIsOpenSearchBox }) {
  const router = useRouter();
  const { closeModal } = useModal();

  const goToSearchPage = () => {
    router.push(`/search/?q=${keyword}`);
    closeModal();
    setIsOpenSearchBox(false);
  };

  return (
    <div
      id="searchbox-suggested-search"
      className={styles.suggested_search}
      onClick={goToSearchPage}
    >
      <span className="d-flex align-items-center justify-content-between">
        <div className={styles.search_icon_container}>
          <svg className={styles.search_icon}>
            <use href="#searchSearch"></use>
          </svg>
        </div>
        <div className="flex-grow-1">
          <span className={styles.suggested_search_name}>{keyword}</span>
        </div>
        <div className={styles.suggest_icon_container}>
          <div className="d-flex" aria-hidden="false">
            <svg className={styles.suggest_icon}>
              <use href="#searchPlaceSuggest"></use>
            </svg>
          </div>
        </div>
      </span>
    </div>
  );
}
export default SearchSaggestedBox;

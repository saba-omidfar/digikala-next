"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

import Image from "next/image";
import Link from "next/link";

import styles from "./headerInfo.module.css";

function HeaderInfo({ headerInfo, hasSearch, mainQuestion }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";

  const [isFocused, setIsFocused] = useState(false);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    if (pathname !== "/faq") return;

    const timeout = setTimeout(() => {
      const value = searchInput.trim();
      router.push(value ? `/faq/?q=${encodeURIComponent(value)}` : "/faq");
    }, 350);

    return () => clearTimeout(timeout);
  }, [searchInput, pathname, router]);

  return (
    <div className="w-100" id="base_layout_desktop_static_header">
      <div className={styles.header_layout__wrapper}>
        <div className={styles.header_layout__cover}>
          <div className={styles.header_layout__logo}>
            {headerInfo?.icon ? (
              <Image
                width={24}
                height={24}
                className={styles.faq_category_img}
                src={headerInfo?.icon}
                alt={headerInfo?.title}
              />
            ) : (
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.faq_icon}>
                  <use href="#question"></use>
                </svg>
              </div>
            )}
          </div>
          {mainQuestion && (
            <Link
              className={styles.category_link}
              href={`/faq/category/${mainQuestion?.category?.id}/`}
            >
              <span>{mainQuestion?.category?.title}</span>
            </Link>
          )}

          <div className={styles.faq_title_container}>
            <p className={styles.faq_title}>
              <span>{headerInfo?.title}</span>
            </p>
            {headerInfo?.subtitle && (
              <p className={styles.faq_subtitle}>{headerInfo?.subtitle}</p>
            )}
          </div>

          {headerInfo?.showInput && (
            <div className={styles.header_layout__search}>
              <label className="d-inline-block w-100">
                <div
                  className={`${styles.header_layout__input_container} ${
                    isFocused ? styles.header_layout__input_focused : ""
                  }`}
                >
                  <input
                    className={styles.header_layout__input}
                    type="text"
                    placeholder="جستجوی موضوع"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderInfo;

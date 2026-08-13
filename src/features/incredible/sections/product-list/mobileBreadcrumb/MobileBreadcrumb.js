import Link from "next/link";
import { useParams } from "next/navigation";

import { useListing } from "@/contexts/ListingContext";

import styles from "./mobileBreadcrumb.module.css";

export default function MobileBreadcrumb({ mobileNavClassname }) {
  const { brand } = useParams();
  const { data, isLoading } = useListing();

  const breadcrumbs = brand ? data?.breadcrumb : data?.breadcrumb?.slice(0, -1);

  if (!breadcrumbs) return;

  return (
    <nav className={mobileNavClassname}>
      {isLoading ? (
        <div className="skeleton_container">
          <div
            className={`${styles.breadcrumb_skeleton} skeleton_no_animation`}
          ></div>
        </div>
      ) : (
        <div className="d-flex overflow-x-auto overflow-y-hidden hide-scrollbar">
          {breadcrumbs?.map((breadcrumb, index, arr) => (
            <Link
              data-cro-id="plp-burger-menu"
              key={breadcrumb?.title}
              className={styles.breadcrumb_link}
              href={breadcrumb?.url}
            >
              <span className={styles.breadcrumb_title}>
                {breadcrumb?.title}
              </span>
              <span className={styles.breadcrumb_divider}>
                {index !== arr.length - 1 ? "/" : ""}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

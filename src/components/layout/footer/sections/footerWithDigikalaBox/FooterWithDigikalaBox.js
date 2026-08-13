import React from "react";
import Link from "next/link";

import styles from "./footerWithDigikalaBox.module.css";

export default function FooterWithDigikalaBox({ feature }) {
  return (
    <div className={styles.with_digikala_container}>
      <p className={styles.with_digikala_title}>{feature.label}</p>
      {feature.children.map((item, index) => (
        <Link key={index} href={item.to} className={styles.with_digikala_link}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}

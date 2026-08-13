import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./footerPartnersLogo.module.css";

function FooterPartnersLogo({ partner }) {
  return (
    <Link href={partner.to} className={styles.partner_link}>
      <div className={styles.partner_img_container}>
        <Image
          fill
          src={partner.src}
          alt={partner.label}
          className={styles.partner_img}
        />
      </div>
    </Link>
  );
}

export default FooterPartnersLogo;

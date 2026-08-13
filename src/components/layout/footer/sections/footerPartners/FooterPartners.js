import Link from "next/link";
import Image from "next/image";

import styles from "./footerPartners.module.css";

function FooterPartners({ footerPartners }) {
  return (
    <div className={styles.footer_partners_container}>
      <div className={styles.footer_partners_container}>
        {footerPartners.children.map((partner, index) => (
          <Link
            key={index}
            href={partner.to}
            className={styles.footer_partner_link}
          >
            <div className={styles.footer_partner_img_container}>
              <Image
                fill
                src={partner.src}
                alt={partner.label}
                className={styles.footer_partner_img}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FooterPartners;

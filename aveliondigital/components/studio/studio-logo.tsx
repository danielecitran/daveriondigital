import Image from "next/image";

import styles from "./studio-logo.module.css";

const LOGO_SRC = "/brand/aveliondigital_header.svg";

/** DV DAVERION DIGITAL — statisch beim Laden, Glitch nur beim Hover des umgebenden Links. */
export function StudioLogo() {
  return (
    <span className={styles.logo}>
      <span className={`${styles.ghost} ${styles.rose}`} aria-hidden />
      <span className={`${styles.ghost} ${styles.cyan}`} aria-hidden />
      <Image
        src={LOGO_SRC}
        alt="Daverion Digital"
        width={750}
        height={150}
        className={styles.base}
        priority
        unoptimized
      />
    </span>
  );
}

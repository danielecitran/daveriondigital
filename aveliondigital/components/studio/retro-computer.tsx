"use client";

import * as React from "react";

import { RetroScreen } from "@/components/studio/retro-screen";
import { cn } from "@/lib/utils";

import styles from "./retro-computer.module.css";

/**
 * Dunkler Compact-Computer im Stil der 80er, als Bühne für den rotierenden
 * DAVERION-DIGITAL-Ring. Rein dekorativ; die Breite kommt über className.
 */
export function RetroComputer({ className }: { className?: string }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      className={cn(styles.root, className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      aria-hidden
    >
      <div className={styles.machine}>
        <div className={styles.spill} />
        <div className={styles.floorShadow} />

        <div className={styles.base}>
          <svg className={styles.sun} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
          </svg>
          <svg className={styles.keys} viewBox="0 0 20 10" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="0.5" y="0.5" width="19" height="9" rx="1" />
            <path d="M3 3.5h1M6 3.5h1M9 3.5h1M12 3.5h1M15 3.5h1M3 6.5h14" />
          </svg>
          <div className={styles.port} />
        </div>

        <div className={styles.housing}>
          <div className={styles.bevel} />
          <div className={styles.recess} />
          <div className={styles.screen}>
            <RetroScreen className={styles.canvas} fast={hover} />
            <div className={styles.scanlines} />
            <div className={styles.glass} />
          </div>

          <div className={styles.badge} />
          <span className={styles.name}>Daverion Digital</span>

          <div className={styles.drive}>
            <div className={styles.slot} />
            <div className={styles.eject} />
          </div>
          <div className={styles.led} />
        </div>
      </div>
    </div>
  );
}

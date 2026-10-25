"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Tauscht ein Wort im Fliesstext aus: Buchstaben steigen gestaffelt auf,
 * das alte Wort zieht nach oben weg. Das erste Wort ist der Ruhezustand
 * (SSR, reduced motion).
 */
export function RotatingWord({
  words,
  interval = 2600,
  className,
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduced, words.length, interval]);

  const word = words[index];

  return (
    <span className={className}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="inline-block whitespace-nowrap"
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ staggerChildren: 0.035 }}
        >
          {word.split("").map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                enter: { y: "0.45em", opacity: 0, filter: "blur(6px)" },
                center: { y: 0, opacity: 1, filter: "blur(0px)" },
                exit: { y: "-0.35em", opacity: 0, filter: "blur(6px)" },
              }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

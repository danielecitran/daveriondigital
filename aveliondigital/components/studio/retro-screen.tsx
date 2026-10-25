"use client";

import * as React from "react";

/**
 * 1-Bit-Bildschirm wie bei den frühen Compact-Macs: Die Szene (rotierender
 * DAVERION-DIGITAL-Ring + DV-Mark mit Lichtstreifen) wird in sehr niedriger
 * Auflösung gezeichnet und dann mit einer 4×4-Bayer-Matrix auf Schwarz/Weiss
 * gedithert. Ordered Dithering bleibt zwischen Frames stabil — Error
 * Diffusion (Atkinson) würde bei Bewegung flimmern.
 */

const W = 144;
const H = 108;
const FPS = 24;
const LOGO_SRC = "/brand/aveliondigital_intro_mark.svg";

/** Ein Umlauf: DAVERION + Wortabstand + DIGITAL + leerer Slot (wie IntroCircularMark). */
const RING = [..."DAVERION".split(""), " ", ..."DIGITAL".split(""), null] as const;

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (v) => (v + 0.5) / 16,
);

/** Phosphor-Weiss und fast Schwarz. */
const ON = [234, 232, 224] as const;
const OFF = [20, 20, 22] as const;

const BOOT_OFF = 0.35;
const BOOT_LINE = 0.3;
const BOOT_FADE = 0.5;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function RetroScreen({
  className,
  fast = false,
}: {
  className?: string;
  /** Beim Hover dreht der Ring schneller. */
  fast?: boolean;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fastRef = React.useRef(fast);

  React.useEffect(() => {
    fastRef.current = fast;
  }, [fast]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const out = canvas.getContext("2d");
    if (!out) return;

    const scene = document.createElement("canvas");
    scene.width = W;
    scene.height = H;
    const ctx = scene.getContext("2d", { willReadFrequently: true });

    const logoLayer = document.createElement("canvas");
    logoLayer.width = W;
    logoLayer.height = H;
    const lctx = logoLayer.getContext("2d");
    if (!ctx || !lctx) return;

    const frame = out.createImageData(W, H);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fontFamily =
      getComputedStyle(document.documentElement).getPropertyValue("--font-inter").trim() ||
      "ui-sans-serif, system-ui, sans-serif";

    const logo = new Image();
    let logoReady = false;
    logo.onload = () => {
      logoReady = true;
      if (reduced) render(0, Infinity);
    };
    logo.src = LOGO_SRC;

    const cx = W / 2;
    const cy = H / 2;
    const ringR = H * 0.38;
    const logoSize = H * 0.5;

    function drawScene(angle: number, t: number) {
      ctx!.globalCompositeOperation = "source-over";
      // Hell bis über den Ring hinaus, gedithertes Abdunkeln nur in den Ecken.
      const bg = ctx!.createRadialGradient(cx, cy, H * 0.2, cx, cy, W * 0.66);
      bg.addColorStop(0, "#ffffff");
      bg.addColorStop(0.6, "#f3f3f3");
      bg.addColorStop(1, "#6f6f6f");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(angle);
      ctx!.fillStyle = "#000";
      ctx!.font = `800 ${Math.round(H * 0.118)}px ${fontFamily}`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      const step = (Math.PI * 2) / RING.length;
      RING.forEach((ch, i) => {
        if (!ch || ch === " ") return;
        const a = -Math.PI / 2 + (i + 0.5) * step;
        ctx!.save();
        ctx!.rotate(a + Math.PI / 2);
        ctx!.fillText(ch, 0, -ringR);
        ctx!.restore();
      });
      ctx!.restore();

      if (!logoReady) return;

      // Logo mit wanderndem Glanzstreifen (wie .avelion-intro-logo-sheen).
      lctx!.globalCompositeOperation = "source-over";
      lctx!.clearRect(0, 0, W, H);
      lctx!.drawImage(logo, cx - logoSize / 2, cy - logoSize / 2, logoSize, logoSize);
      lctx!.globalCompositeOperation = "source-atop";
      const period = 3.4;
      const p = (t % period) / period;
      const sweepX = cx + (1.4 - 2.8 * p) * logoSize;
      const band = lctx!.createLinearGradient(sweepX - logoSize * 0.3, 0, sweepX + logoSize * 0.3, H * 0.25);
      band.addColorStop(0, "rgba(255,255,255,0)");
      band.addColorStop(0.5, "rgba(255,255,255,0.85)");
      band.addColorStop(1, "rgba(255,255,255,0)");
      lctx!.fillStyle = band;
      lctx!.fillRect(0, 0, W, H);
      ctx!.drawImage(logoLayer, 0, 0);
    }

    /** Einschalten: kurz aus, dann eine helle Linie, die sich öffnet, dann Szene. */
    function drawBoot(bootT: number, angle: number, t: number) {
      if (bootT < BOOT_OFF) {
        ctx!.fillStyle = "#000";
        ctx!.fillRect(0, 0, W, H);
        return;
      }
      if (bootT < BOOT_OFF + BOOT_LINE) {
        const p = easeOutCubic((bootT - BOOT_OFF) / BOOT_LINE);
        ctx!.fillStyle = "#000";
        ctx!.fillRect(0, 0, W, H);
        const h = Math.max(1, p * H);
        const glow = ctx!.createLinearGradient(0, cy - h / 2, 0, cy + h / 2);
        glow.addColorStop(0, "rgba(255,255,255,0.35)");
        glow.addColorStop(0.5, "#fff");
        glow.addColorStop(1, "rgba(255,255,255,0.35)");
        ctx!.fillStyle = glow;
        ctx!.fillRect(W * (0.5 - 0.5 * Math.min(1, p * 1.6)), cy - h / 2, W * Math.min(1, p * 1.6), h);
        return;
      }
      drawScene(angle, t);
      const fade = (bootT - BOOT_OFF - BOOT_LINE) / BOOT_FADE;
      if (fade < 1) {
        ctx!.fillStyle = `rgba(255,255,255,${1 - easeOutCubic(fade)})`;
        ctx!.fillRect(0, 0, W, H);
      }
    }

    function dither() {
      const src = ctx!.getImageData(0, 0, W, H).data;
      const dst = frame.data;
      for (let y = 0; y < H; y++) {
        const row = (y & 3) * 4;
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          const lum = (0.2126 * src[i] + 0.7152 * src[i + 1] + 0.0722 * src[i + 2]) / 255;
          const c = lum > BAYER[row + (x & 3)] ? ON : OFF;
          dst[i] = c[0];
          dst[i + 1] = c[1];
          dst[i + 2] = c[2];
          dst[i + 3] = 255;
        }
      }
      out!.putImageData(frame, 0, 0);
    }

    let angle = 0;
    let speed = 1;

    function render(t: number, bootT: number) {
      if (bootT === Infinity) drawScene(angle, t);
      else drawBoot(bootT, angle, t);
      dither();
    }

    if (reduced) {
      render(0, Infinity);
      return;
    }

    let raf = 0;
    let running = false;
    let start = 0;
    let last = 0;
    let bootStart = -1;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 1000 / FPS) return;
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      if (!start) start = now;
      if (bootStart < 0) bootStart = now;

      // Eine Umdrehung in ~26 s, beim Hover weich auf das Dreifache.
      speed += ((fastRef.current ? 3 : 1) - speed) * Math.min(1, dt * 4);
      angle += dt * speed * ((Math.PI * 2) / 26);

      const t = (now - start) / 1000;
      const bootT = (now - bootStart) / 1000;
      render(t, bootT > BOOT_OFF + BOOT_LINE + BOOT_FADE ? Infinity : bootT);
    };

    const play = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let inView = false;
    const sync = () => (inView && !document.hidden ? play() : pause());
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className={className}
      style={{ imageRendering: "pixelated" }}
      aria-hidden
    />
  );
}

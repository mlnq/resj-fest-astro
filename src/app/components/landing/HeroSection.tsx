import { Instagram } from "lucide-react";
import { motion, type MotionValue } from "motion/react";
import type { RefObject } from "react";
import { CutoutButton } from "./components/CutoutButton";

type HeroSectionProps = {
  heroRef: RefObject<HTMLElement | null>;
  sectionId?: string;
  logoSrc: string;
  heroBackgroundSrc: string;
  lodzSrc: string;
  wodaSrc: string;
  palmaSrc: string;
  rybaSrc: string;
  y1: MotionValue<number>;
  y2: MotionValue<number>;
  y3: MotionValue<number>;
  opacity: MotionValue<number>;
};

export function HeroSection({
  heroRef,
  sectionId,
  logoSrc,
  heroBackgroundSrc,
  lodzSrc,
  wodaSrc,
  palmaSrc,
  rybaSrc,
  y1,
  y2,
  y3,
  opacity,
}: HeroSectionProps) {
  return (
    <section
      id={sectionId}
      ref={heroRef}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#111111]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroBackgroundSrc}
          alt=""
          className="h-auto w-full max-w-none object-cover object-center md:h-full md:w-full"
        />
      </div>
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30" />
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_42%)]" />
      </div>

      <motion.img
        src={lodzSrc}
        alt=""
        className="pointer-events-none absolute left-[4%] top-[14%] z-10 w-16 opacity-70 drop-shadow-lg md:left-[6%] md:w-24"
        style={{ y: y1, rotate: -10 }}
        initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
        animate={{ opacity: 0.7, scale: 1, rotate: -10 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      />
      <motion.img
        src={wodaSrc}
        alt=""
        className="pointer-events-none absolute bottom-[18%] left-[5%] z-10 w-20 opacity-65 drop-shadow-lg md:left-[8%] md:w-32"
        style={{ y: y2, rotate: 6 }}
        initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
        animate={{ opacity: 0.65, scale: 1, rotate: 6 }}
        transition={{ duration: 0.9, delay: 0.35 }}
      />
      <motion.img
        src={palmaSrc}
        alt=""
        className="pointer-events-none absolute right-[5%] top-[16%] z-10 w-20 opacity-70 drop-shadow-lg md:right-[8%] md:w-32"
        style={{ y: y3, rotate: 10 }}
        initial={{ opacity: 0, scale: 0.85, rotate: 10 }}
        animate={{ opacity: 0.7, scale: 1, rotate: 10 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      />
      <motion.img
        src={rybaSrc}
        alt=""
        className="pointer-events-none absolute bottom-[20%] right-[6%] z-10 w-[4.5rem] opacity-65 drop-shadow-lg md:right-[9%] md:w-28"
        style={{ y: y1, rotate: -9 }}
        initial={{ opacity: 0, scale: 0.85, rotate: -9 }}
        animate={{ opacity: 0.65, scale: 1, rotate: -9 }}
        transition={{ duration: 0.9, delay: 0.65 }}
      />

      <motion.div
        className="relative z-10 flex h-full -translate-y-8 flex-col items-center justify-center px-5 pt-20 pb-16 text-white md:-translate-y-14 md:px-8 md:pt-0 md:pb-24 lg:-translate-y-8 lg:pb-10"
        style={{ opacity }}
      >
        <motion.img
          src={logoSrc}
          alt="Rejs Fest 26"
          className="mb-8 w-full max-w-[260px] drop-shadow-2xl [filter:brightness(0)_invert(1)] md:mb-10 md:mt-24 md:max-w-[340px] lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          className="max-w-4xl space-y-4 text-center md:space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="px-2 text-4xl leading-none font-black tracking-[-0.03em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)] md:text-7xl">
            Doświadczenie młodego Kościoła
          </h1>
          <p className="text-base font-black tracking-[0.18em] uppercase text-white/90 md:text-lg">
            29 sierpnia 2026 • 10:00–22:00
          </p>
          <p className="mx-auto max-w-2xl px-4 text-base text-white/88 md:text-xl">
            Plac przy kościele Niepokalanego Serca Maryi, Dojlidy
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 md:mt-8 md:flex-row">
            <CutoutButton
              colorClassName="bg-[#F9E926] text-gray-900 shadow-xl hover:bg-white hover:text-[#1F1F1A]"
              className="px-10 py-3 text-base md:px-14 md:py-4 md:text-lg"
              whileHover={{ scale: 1.05, rotate: -1 }}
            >
              Zapisz się
            </CutoutButton>

            <motion.a
              href="https://www.instagram.com/rejsfest"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Rejs Fest"
              className="flex h-14 w-14 items-center justify-center bg-white text-[#325DA8] shadow-xl md:h-15 md:w-15"
              style={{ clipPath: "polygon(12% 0, 100% 8%, 88% 100%, 0 92%)" }}
              whileHover={{ scale: 1.06, rotate: 2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Instagram className="h-6 w-6" strokeWidth={2.4} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

import { Instagram } from "lucide-react";
import { motion, type MotionValue } from "motion/react";
import type { RefObject } from "react";
import { CutoutButton } from "./components/CutoutButton";

type HeroSectionProps = {
  heroRef: RefObject<HTMLElement | null>;
  sectionId?: string;
  logoSrc: string;
  desktopLogoSrc: string;
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
  desktopLogoSrc,
  heroBackgroundSrc,
  lodzSrc: _lodzSrc,
  wodaSrc: _wodaSrc,
  palmaSrc: _palmaSrc,
  rybaSrc: _rybaSrc,
  y1: _y1,
  y2: _y2,
  y3: _y3,
  opacity,
}: HeroSectionProps) {
  return (
    <section
      id={sectionId}
      ref={heroRef}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#FEFEFE]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(157,160,208,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(76,81,133,0.1),transparent_32%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(234, 240, 251, 0.24) 100%), url(${heroBackgroundSrc})`,
            clipPath: "polygon(33% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(246,249,255,0.92)_0%,rgba(216,229,252,0.72)_52%,rgba(155,188,241,0.52)_100%)] mix-blend-screen"
          style={{ clipPath: "polygon(33% 0, 100% 0, 100% 100%, 0 100%)" }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(180deg,rgba(254,254,254,0)_0%,rgba(234,240,251,0.45)_100%)] md:hidden" />

      <motion.div
        className="relative z-10 flex h-full items-start justify-center px-6 pt-[calc(env(safe-area-inset-top)+4.75rem)] pb-20 md:items-center md:justify-start md:px-10 md:pt-0 lg:px-16"
        style={{ opacity }}
      >
        <motion.div
          className="ml-0 flex max-w-3xl flex-col items-center space-y-5 pt-10 text-center md:ml-8 md:items-start md:pt-0 md:text-left lg:ml-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.img
            src={logoSrc}
            alt="Rejs Fest 26"
            className="w-full max-w-[200px] md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.img
            src={desktopLogoSrc}
            alt="Rejs Fest 26"
            className="hidden w-full max-w-[300px] md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />

          <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 bg-[#ECEAF7] px-4 py-3 text-[0.95rem] font-black tracking-[0.14em] text-[var(--festival-violet-dark)] uppercase shadow-[0_12px_30px_rgba(45,53,74,0.12)] md:text-base">
            <span>Białystok</span>
            <span className="text-[var(--festival-violet-dark)]/70">•</span>
            <span>Sierpień 2026</span>
          </div>

          <h1 className="max-w-[12ch] text-[3rem] leading-[0.92] font-black tracking-[-0.05em] text-[#21314E] md:max-w-2xl md:text-7xl">
            Doświadczenie młodego Kościoła
          </h1>

          <p className="max-w-[20ch] text-[1.05rem] leading-8 text-[#4E5E7C] md:max-w-2xl md:text-xl">
            Plac przy kościele Niepokalanego Serca Maryi, Dojlidy
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <CutoutButton
              colorClassName="bg-[var(--festival-violet)] text-white shadow-[0_16px_40px_rgba(157,160,208,0.3)] hover:bg-[#8689BF]"
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
              className="flex h-14 w-14 shrink-0 items-center justify-center border bg-white text-[var(--festival-violet)] shadow-[0_14px_35px_rgba(76,81,133,0.12)] md:h-15 md:w-15"
              style={{
                clipPath: "polygon(12% 0, 100% 8%, 88% 100%, 0 92%)",
                borderColor: "rgba(157,160,208,0.28)",
              }}
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

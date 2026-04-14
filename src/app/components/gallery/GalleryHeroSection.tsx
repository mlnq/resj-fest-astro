import { motion } from "motion/react";
import { CutoutButton } from "../landing/components/CutoutButton";

type GalleryHeroSectionProps = {
  palmaSrc: string;
  lodzSrc: string;
};

export function GalleryHeroSection({
  palmaSrc,
  lodzSrc,
}: GalleryHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#325DA8] px-4 py-20 text-white md:px-6 md:py-28">
      <img
        src={palmaSrc}
        alt=""
        className="absolute top-8 right-[8%] w-24 opacity-20 md:w-36"
      />
      <img
        src={lodzSrc}
        alt=""
        className="absolute bottom-6 left-[6%] w-24 opacity-20 md:w-40"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#F9E926]">
          Rejs Fest 26
        </p>
        <h1 className="max-w-3xl text-4xl leading-tight font-bold md:text-6xl">
          Galeria momentów, ludzi i przestrzeni festiwalu
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/85 md:text-xl">
          Osobna strona galerii zbiera najważniejsze kadry z wydarzenia i porządkuje
          je w sekcje, żeby łatwiej było przeglądać cały dzień.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <CutoutButton
            colorClassName="bg-[#F9E926] text-gray-900 hover:bg-[#E5D520] shadow-xl"
            className="px-8 py-3 text-sm md:text-base"
            whileHover={{ scale: 1.05, rotate: -1 }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Wróć na stronę główną
          </CutoutButton>
        </div>
      </motion.div>
    </section>
  );
}

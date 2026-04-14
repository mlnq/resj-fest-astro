import { motion } from "motion/react";
import niemaGotuImage from "../../../assets/imports/niemaGOtu.jpg";
import { assetUrl } from "../../utils/assets";
import { SvgLabelHeading } from "./components/SvgLabelHeading";

type NiemaGotuSectionProps = {
  sectionId?: string;
};

export function NiemaGotuSection({ sectionId }: NiemaGotuSectionProps) {
  return (
    <section
      id={sectionId}
      className="relative overflow-hidden bg-[#FEFEFE] px-4 py-16 md:px-6 md:py-24"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-[-8%] scale-110 bg-cover bg-center bg-no-repeat opacity-100 blur-3xl"
          style={{ backgroundImage: `url(${assetUrl(niemaGotuImage)})` }}
        />
        {/* <div className="absolute inset-0 bg-[#FEFEFE]/78" /> */}
      </div>

      <div
        className="absolute top-0 left-0 h-56 w-56 -translate-x-1/3 -translate-y-1/3 bg-[#325DA8]/10"
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-14"
      >
        <div className="order-2 space-y-5 md:order-1">
          <SvgLabelHeading text="NiemaGotu" />
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Koncert Niemagotu
          </h2>
          <p className="max-w-xl text-base leading-8 text-white md:text-lg">
            Wieczorem festiwal domknie koncert zespołu NiemaGotu. To moment,
            który łączy energię sceny z doświadczeniem wspólnoty i prowadzi
            naturalnie do finału całego dnia.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
          className="order-1 overflow-hidden shadow-2xl md:order-2"
          style={{ clipPath: "polygon(2% 0, 100% 1%, 98% 100%, 0 99%)" }}
        >
          <img
            src={assetUrl(niemaGotuImage)}
            alt="Koncert NiemaGotu"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

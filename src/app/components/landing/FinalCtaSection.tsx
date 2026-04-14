import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import labelTwoSvg from "../../../assets/imports/label_2.svg";
import { assetUrl } from "../../utils/assets";

type FinalCtaSectionProps = {
  sectionId?: string;
  palmaSrc: string;
  lodzSrc: string;
  wodaSrc: string;
};

export function FinalCtaSection({
  sectionId,
  palmaSrc,
  lodzSrc,
  wodaSrc,
}: FinalCtaSectionProps) {
  return (
    <section
      id={sectionId}
      className="relative overflow-hidden bg-[radial-gradient(circle_at_center,#5D8EE8_0%,#3F72D0_38%,#2E5BA8_70%,#244988_100%)] px-5 py-20 text-white md:px-6 md:py-18"
    >
      <div className="absolute inset-0">
        <div className="absolute left-[-8%] top-[8%] h-40 w-40 rounded-full bg-white/10 blur-3xl md:h-72 md:w-72" />
        <div className="absolute right-[-6%] bottom-[10%] h-48 w-48 rounded-full bg-[#9DA0D0]/20 blur-3xl md:h-80 md:w-80" />
        <img
          src={palmaSrc}
          alt=""
          className="absolute left-[6%] top-[12%] w-16 opacity-10 md:w-24"
        />
        <img
          src={lodzSrc}
          alt=""
          className="absolute right-[8%] bottom-[18%] w-16 opacity-10 md:w-24"
        />
        <img
          src={wodaSrc}
          alt=""
          className="absolute left-1/2 top-1/2 w-32 -translate-x-1/2 -translate-y-1/2 opacity-8 md:w-48"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-auto max-w-xl text-center"
      >
        <h2 className="font-rejsfest text-5xl leading-[0.9] tracking-[0.03em] uppercase text-white md:text-[4.9rem]">
          Dołącz
          <br />
          Do Nas!
        </h2>

        <p className="mx-auto mt-8 max-w-lg text-xl leading-[1.35] text-[#C9D5F4] md:mt-7 md:text-[1.22rem]">
          Bądź na bieżąco z ogłoszeniami i informacjami o biletach.
        </p>

        <div className="mx-auto mt-10 max-w-2xl md:mt-8 md:max-w-lg">
          <div className="relative md:mx-auto md:max-w-[28rem]">
            <img src={assetUrl(labelTwoSvg)} alt="" className="block w-full opacity-80" />
            <input
              type="email"
              placeholder="TWÓJ EMAIL"
              className="absolute inset-0 w-full bg-transparent px-8 text-center text-xl font-black uppercase tracking-[0.03em] text-white placeholder:text-[#AFC0F2]/80 focus:outline-none md:px-8 md:text-[1.2rem]"
            />
          </div>

          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-3 bg-white px-8 py-5 text-center text-2xl font-black uppercase tracking-[-0.03em] text-[#325DA8] shadow-[0_18px_40px_rgba(18,40,89,0.24)] transition-transform hover:scale-[1.01] md:mx-auto md:max-w-[28rem] md:py-3.5 md:text-[1.45rem]"
            style={{ clipPath: "polygon(2% 0, 98% 0, 100% 48%, 98% 100%, 2% 100%, 0 50%)" }}
          >
            <span>Zapisz Się</span>
            <ArrowRight className="h-7 w-7 md:h-5 md:w-5" strokeWidth={2.8} />
          </button>
        </div>

       
      </motion.div>
    </section>
  );
}

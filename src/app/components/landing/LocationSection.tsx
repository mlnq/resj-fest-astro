import { motion } from "motion/react";
import { MapPin } from "lucide-react";

type LocationSectionProps = {
  sectionId?: string;
};

export function LocationSection({ sectionId }: LocationSectionProps) {
  return (
    <section id={sectionId} className="bg-[#F1F4F8] px-5 py-18 md:px-8 md:py-18">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="font-rejsfest mb-10 text-5xl uppercase tracking-[0.03em] text-[#2F3A50] md:mb-10 md:text-5xl"
        >
          Miejsce
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="relative mx-auto max-w-[42rem] overflow-hidden bg-[#E8E8E4] px-6 py-8 md:px-6 md:py-6"
          style={{ clipPath: "polygon(3% 0, 100% 2%, 97% 100%, 0 98%)" }}
        >
          <div className="absolute inset-0 opacity-70">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.25)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.85),transparent_18%),radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.75),transparent_16%),radial-gradient(circle_at_35%_70%,rgba(255,255,255,0.7),transparent_18%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.6),transparent_20%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_18%,rgba(255,255,255,0.7)_18.5%,transparent_19%,transparent_43%,rgba(255,255,255,0.55)_43.5%,transparent_44%,transparent_67%,rgba(255,255,255,0.7)_67.5%,transparent_68%,transparent_100%),linear-gradient(150deg,transparent_0%,transparent_22%,rgba(255,255,255,0.75)_22.5%,transparent_23%,transparent_56%,rgba(255,255,255,0.6)_56.5%,transparent_57%,transparent_100%),linear-gradient(25deg,transparent_0%,transparent_28%,rgba(255,255,255,0.55)_28.5%,transparent_29%,transparent_72%,rgba(255,255,255,0.7)_72.5%,transparent_73%,transparent_100%)]" />
          </div>

          <div
            className="relative z-10 mx-auto mt-18 max-w-[27rem] bg-[var(--festival-violet-dark)] px-6 py-7 text-white shadow-[0_24px_40px_rgba(45,53,74,0.28)] md:mt-14 md:px-7 md:py-7"
            style={{ clipPath: "polygon(3% 0, 98% 0, 100% 52%, 98% 100%, 4% 97%, 0 10%)" }}
          >
            <MapPin className="mb-5 h-12 w-12 text-white md:h-9 md:w-9" strokeWidth={2.2} />

            <h3 className="mb-4 text-3xl font-black tracking-[-0.03em] text-white md:text-[1.95rem]">
              Dojlidy przy plaży
            </h3>

            <p className="max-w-lg text-lg leading-[1.3] text-[#D6DCEF] md:text-[1.25rem]">
              Plac przy kościele Niepokalanego
              <br />
              Serca Maryi, Białystok
            </p>

            <a
              href="https://maps.google.com/?q=Kościół+Niepokalanego+Serca+Maryi+Białystok+Dojlidy"
              target="_blank"
              rel="noreferrer"
              className="mt-8 flex w-full items-center justify-center bg-white px-6 py-4 text-center text-lg font-black uppercase text-[var(--festival-violet-dark)] transition-transform hover:scale-[1.01] md:mt-7 md:py-3.5 md:text-[1.2rem]"
              style={{ clipPath: "polygon(1% 0, 100% 0, 99% 100%, 0 100%)" }}
            >
              Otwórz Mapę
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "./components/SectionHeading";

type FaqSectionProps = {
  sectionId?: string;
};

const faqItems = [
  {
    question: "Czy trzeba zapisać się wcześniej?",
    answer:
      "Warto, szczególnie jeśli uruchomimy formularz dla warsztatów, komunikacji organizacyjnej albo limitowanych stref. Sama obecność na wydarzeniu pozostaje otwarta.",
  },
  {
    question: "Czy mogę przyjść tylko na część programu?",
    answer:
      "Tak. Możesz dołączyć także w trakcie dnia, ale najlepiej być od początku, żeby wejść w rytm całego wydarzenia i nie przegapić kluczowych punktów.",
  },
  {
    question: "Czy wydarzenie jest płatne?",
    answer:
      "Na ten moment zakładamy bezpłatny udział. Jeśli pojawi się osobna strefa z zapisami lub ograniczona pula wejść, damy znać z wyprzedzeniem.",
  },
  {
    question: "Czy na miejscu będzie jedzenie i woda?",
    answer:
      "Planujemy zaplecze organizacyjne i przerwy, ale najlepiej zabrać własną wodę i przygotować się na cały dzień poza domem.",
  },
  {
    question: "Czy mogę przyjechać z grupą lub wspólnotą?",
    answer:
      "Tak. To wręcz dobry pomysł. Jeśli planujecie przyjazd większą ekipą, warto zgłosić to wcześniej, żebyśmy mogli lepiej przygotować logistykę.",
  },
  {
    question: "Gdzie pytać, jeśli coś się zmieni?",
    answer:
      "Najpewniejsze źródła to Instagram Rejs Fest oraz kontakt mailowy i telefoniczny podane na końcu strony.",
  },
] as const;

export function FaqSection({ sectionId }: FaqSectionProps) {
  return (
    <section id={sectionId} className="bg-[#EEF3FF] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="FAQ"
          description="Najczęstsze pytania zebrane w jednym miejscu, żeby uczestnik nie musiał szukać konkretów między sekcjami landing page."
        />

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.details
              key={item.question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="group overflow-hidden bg-white shadow-[0_12px_30px_rgba(37,57,106,0.10)]"
              style={{ clipPath: "polygon(1% 0, 100% 1%, 99% 100%, 0 99%)" }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-xl font-black tracking-[-0.03em] text-[#21314E] marker:content-none">
                <span>{item.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-[#E6EAF5] px-6 py-5 text-[1rem] leading-7 text-[#5B6375]">
                {item.answer}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

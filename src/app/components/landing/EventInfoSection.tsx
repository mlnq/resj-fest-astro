import {
  Accessibility,
  Banknote,
  Car,
  Clock3,
  MapPinned,
  Ticket,
  UserRound,
  Backpack,
} from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "./components/SectionHeading";

type EventInfoSectionProps = {
  sectionId?: string;
};

const infoItems = [
  {
    title: "Dla kogo",
    description:
      "Dla młodzieży, studentów, młodych dorosłych oraz wszystkich, którzy chcą wejść w doświadczenie wspólnoty, modlitwy i festiwalowej atmosfery.",
    icon: UserRound,
    accent: "#F29BBE",
  },
  {
    title: "Koszt",
    description:
      "Wstęp na wydarzenie jest bezpłatny. Jeśli pojawią się zapisy na wybrane strefy lub pakiety, poinformujemy o tym z wyprzedzeniem.",
    icon: Banknote,
    accent: "#F9E926",
  },
  {
    title: "Limity miejsc",
    description:
      "Strefa główna jest otwarta, ale na warsztaty i wybrane aktywności może obowiązywać limit miejsc. Warto zapisać się wcześniej.",
    icon: Ticket,
    accent: "#325DA8",
  },
  {
    title: "Godziny wejścia",
    description:
      "Teren wydarzenia otwieramy od 9:30. Oficjalny program startuje o 10:00, a wejście będzie możliwe także w trakcie dnia.",
    icon: Clock3,
    accent: "#9DA0D0",
  },
  {
    title: "Parking i dojazd",
    description:
      "Na miejsce najlepiej dojechać komunikacją miejską lub wspólnym transportem. Samochód warto zostawić nieco dalej i podejść pieszo.",
    icon: Car,
    accent: "#325DA8",
  },
  {
    title: "Dostępność",
    description:
      "Teren jest otwarty i możliwie prosty w poruszaniu się. Jeśli potrzebujesz konkretnego wsparcia organizacyjnego, napisz wcześniej.",
    icon: Accessibility,
    accent: "#F29BBE",
  },
  {
    title: "Co zabrać",
    description:
      "Wodę, coś przeciwdeszczowego, krem z filtrem, powerbank i wygodne ubranie. Wieczorem może zrobić się chłodniej.",
    icon: Backpack,
    accent: "#F9E926",
  },
  {
    title: "Miejsce i logistyka",
    description:
      "Plac przy kościele Niepokalanego Serca Maryi na Dojlidach. Na miejscu planujemy scenę, strefę relacji, warsztaty i przestrzeń modlitwy.",
    icon: MapPinned,
    accent: "#9DA0D0",
  },
] as const;

export function EventInfoSection({ sectionId }: EventInfoSectionProps) {
  return (
    <section id={sectionId} className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Informacje Organizacyjne"
          description="Najważniejsze konkrety zebrane w jednym miejscu, żeby uczestnik od razu wiedział jak wygląda wejście, dojazd i przebieg dnia."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {infoItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="relative overflow-hidden bg-[#F8F6EF] p-6 shadow-[0_14px_34px_rgba(28,33,52,0.08)]"
                style={{ clipPath: "polygon(1% 0, 100% 1%, 99% 100%, 0 99%)" }}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center text-[#1E2436]"
                  style={{
                    backgroundColor: item.accent,
                    clipPath: "polygon(10% 0, 100% 8%, 90% 100%, 0 92%)",
                  }}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.4} />
                </div>
                <h3 className="mb-3 text-2xl font-black tracking-[-0.03em] text-[#1F2535]">
                  {item.title}
                </h3>
                <p className="text-[1rem] leading-7 text-[#5E6472]">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

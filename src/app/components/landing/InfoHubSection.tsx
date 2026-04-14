import {
  CircleHelp,
  FileText,
  Handshake,
  MapPinned,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { withBasePath } from "../../utils/assets";
import { SectionHeading } from "./components/SectionHeading";

type InfoHubSectionProps = {
  sectionId?: string;
};

const hubItems = [
  {
    title: "Szczegółowy program",
    description: "Pełna rozpiska dnia z godzinami, blokami i opisem wydarzeń.",
    href: withBasePath("/program"),
    icon: ScrollText,
    accent: "#9DA0D0",
    textColor: "#FFFFFF",
    actionLabel: "Sprawdź",
    tilt: "-1.8deg",
    clipPath: "polygon(3% 4%, 98% 0, 97% 92%, 0 100%)",
  },
  {
    title: "Informacje dla uczestników",
    description: "Dojazd, wejście, koszt, limity miejsc, parking i co zabrać.",
    href: withBasePath("/informacje"),
    icon: MapPinned,
    accent: "#F3DC63",
    textColor: "#26324B",
    actionLabel: "Dojazd",
    tilt: "1.4deg",
    clipPath: "polygon(2% 0, 100% 3%, 96% 100%, 1% 95%)",
  },
  {
    title: "FAQ",
    description: "Najczęstsze pytania o zapis, wejście, grupy i przebieg dnia.",
    href: withBasePath("/faq"),
    icon: CircleHelp,
    accent: "#85658D",
    textColor: "#FFFFFF",
    actionLabel: "Odpowiedzi",
    tilt: "1.8deg",
    clipPath: "polygon(2% 1%, 99% 3%, 100% 90%, 0 95%)",
  },
  {
    title: "Organizatorzy i partnerzy",
    description: "Kto stoi za wydarzeniem, kontakt oraz miejsce na sponsorów i patronów.",
    href: withBasePath("/organizatorzy-i-partnerzy"),
    icon: Handshake,
    accent: "#E6C1F1",
    textColor: "#3A2D45",
    actionLabel: "Poznaj",
    tilt: "-2deg",
    clipPath: "polygon(4% 0, 100% 6%, 96% 100%, 0 92%)",
  },
  {
    title: "Regulamin",
    description: "Zasady uczestnictwa i informacje organizacyjne w pełnej wersji.",
    href: withBasePath("/regulamin"),
    icon: FileText,
    accent: "#325DA8",
    textColor: "#FFFFFF",
    actionLabel: "Zobacz",
    tilt: "1.2deg",
    clipPath: "polygon(0 3%, 97% 0, 100% 97%, 2% 100%)",
  },
  {
    title: "Polityka prywatności",
    description: "Informacje o przetwarzaniu danych, formularzach i komunikacji.",
    href: withBasePath("/polityka-prywatnosci"),
    icon: ShieldCheck,
    accent: "#9DA0D0",
    textColor: "#24324A",
    actionLabel: "Czytaj",
    tilt: "-1.3deg",
    clipPath: "polygon(2% 0, 100% 4%, 98% 96%, 0 100%)",
  },
] as const;

export function InfoHubSection({ sectionId }: InfoHubSectionProps) {
  return (
    <section id={sectionId} className="bg-[#FEFEFE] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Więcej Informacji"
          description="Szczegóły organizacyjne, rozbudowane FAQ i komplet dokumentów przenieśliśmy na osobne podstrony, żeby landing pozostał czytelny."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {hubItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="group relative overflow-hidden p-7 shadow-[0_18px_46px_rgba(28,33,52,0.1)] transition-transform hover:-translate-y-1 md:p-8"
                style={{
                  clipPath: item.clipPath,
                  backgroundColor: item.accent,
                  transform: `rotate(${item.tilt})`,
                }}
              >
                <div
                  className="mb-8 flex h-14 w-14 items-center justify-center border border-current/20"
                  style={{
                    color: item.textColor,
                    clipPath: "polygon(10% 0, 100% 8%, 90% 100%, 0 92%)",
                  }}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.4} />
                </div>
                <h3
                  className="font-rejsfest mb-4 text-[2.35rem] leading-[0.92] uppercase tracking-[0.02em]"
                  style={{ color: item.textColor }}
                >
                  {item.title}
                </h3>
                <p
                  className="max-w-[26ch] text-[1rem] leading-7"
                  style={{ color: `${item.textColor}D9` }}
                >
                  {item.description}
                </p>
                <p
                  className="mt-8 text-[0.78rem] font-black uppercase tracking-[0.18em]"
                  style={{ color: item.textColor }}
                >
                  {item.actionLabel}
                </p>
                <div
                  className="mt-1 h-[2px] w-14 origin-left transition-transform duration-200 group-hover:scale-x-125"
                  style={{ backgroundColor: item.textColor }}
                />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

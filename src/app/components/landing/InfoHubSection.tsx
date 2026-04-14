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
    accent: "#325DA8",
  },
  {
    title: "Informacje dla uczestników",
    description: "Dojazd, wejście, koszt, limity miejsc, parking i co zabrać.",
    href: withBasePath("/informacje"),
    icon: MapPinned,
    accent: "#F9E926",
  },
  {
    title: "FAQ",
    description: "Najczęstsze pytania o zapis, wejście, grupy i przebieg dnia.",
    href: withBasePath("/faq"),
    icon: CircleHelp,
    accent: "#F29BBE",
  },
  {
    title: "Organizatorzy i partnerzy",
    description: "Kto stoi za wydarzeniem, kontakt oraz miejsce na sponsorów i patronów.",
    href: withBasePath("/organizatorzy-i-partnerzy"),
    icon: Handshake,
    accent: "#9DA0D0",
  },
  {
    title: "Regulamin",
    description: "Zasady uczestnictwa i informacje organizacyjne w pełnej wersji.",
    href: withBasePath("/regulamin"),
    icon: FileText,
    accent: "#325DA8",
  },
  {
    title: "Polityka prywatności",
    description: "Informacje o przetwarzaniu danych, formularzach i komunikacji.",
    href: withBasePath("/polityka-prywatnosci"),
    icon: ShieldCheck,
    accent: "#F29BBE",
  },
] as const;

export function InfoHubSection({ sectionId }: InfoHubSectionProps) {
  return (
    <section id={sectionId} className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Więcej Informacji"
          description="Szczegóły organizacyjne, rozbudowane FAQ i komplet dokumentów przenieśliśmy na osobne podstrony, żeby landing pozostał czytelny."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                className="group relative overflow-hidden bg-[#F8F6EF] p-6 shadow-[0_14px_34px_rgba(28,33,52,0.08)] transition-transform hover:-translate-y-1"
                style={{ clipPath: "polygon(1% 0, 100% 1%, 99% 100%, 0 99%)" }}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center text-white"
                  style={{
                    backgroundColor: item.accent,
                    clipPath: "polygon(10% 0, 100% 8%, 90% 100%, 0 92%)",
                  }}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.4} />
                </div>
                <h3 className="mb-3 text-2xl font-black tracking-[-0.03em] text-[#1F2535] group-hover:text-[#244988]">
                  {item.title}
                </h3>
                <p className="text-[1rem] leading-7 text-[#5E6472]">
                  {item.description}
                </p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

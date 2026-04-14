import { SectionHeading } from "./components/SectionHeading";
import { ThemeCard } from "./components/ThemeCard";

type ThemeSectionProps = {
  sectionId?: string;
  lodzSrc: string;
  rybaSrc: string;
  wodaSrc: string;
};

const themeItems = [
  {
    title: "Przyjaźń",
    description:
      "Noe chodził w przyjaźni z Bogiem. Wartość przyjaźni dzisiaj w dobie narcyzmu i samotności.",
    iconBackground: "#F29BBE",
    iconClipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
    cardClipPath: "polygon(1% 0, 100% 2%, 99% 100%, 0 98%)",
    rotate: -2,
    iconRotateClass: "-rotate-3",
    imageKey: "lodzSrc",
  },
  {
    title: "Ocalenie",
    description:
      "Noe buduje arkę dla ocalenia ludzkości. Bóg przychodzi z ocaleniem, a nie zagładą.",
    iconBackground: "#325DA8",
    iconClipPath: "polygon(0 5%, 95% 0, 100% 95%, 5% 100%)",
    cardClipPath: "polygon(0 1%, 99% 0, 100% 99%, 1% 100%)",
    rotate: 1,
    iconRotateClass: "rotate-2",
    imageKey: "rybaSrc",
  },
  {
    title: "Przymierze",
    description:
      "Pierwsze przymierze Boga z człowiekiem – łuk na niebie jako znak wiecznej obietnicy.",
    iconBackground: "#9DA0D0",
    iconClipPath: "polygon(0 0, 95% 5%, 100% 100%, 5% 95%)",
    cardClipPath: "polygon(2% 0, 100% 1%, 98% 100%, 0 99%)",
    rotate: -1,
    iconRotateClass: "rotate-1",
    imageKey: "wodaSrc",
  },
] as const;

export function ThemeSection({
  sectionId,
  lodzSrc,
  rybaSrc,
  wodaSrc,
}: ThemeSectionProps) {
  const iconMap = { lodzSrc, rybaSrc, wodaSrc };

  return (
    <section
      id={sectionId}
      className="relative bg-[#EBEBF5] px-4 py-16 md:px-6 md:py-24"
    >
      <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-[#F9E926]/20 blur-3xl" />
      <div className="absolute bottom-20 left-10 h-40 w-40 rounded-full bg-[#9DA0D0]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          title="POSTAĆ NOEGO"
          description="Ewangelizacja, doświadczenie młodego Kościoła, integracja i zjednoczenie środowiska białostockiego"
          titleClassName="text-4xl md:text-5xl"
        />

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {themeItems.map((item, index) => (
            <ThemeCard
              key={item.title}
              title={item.title}
              description={item.description}
              iconSrc={iconMap[item.imageKey]}
              iconBackground={item.iconBackground}
              iconClipPath={item.iconClipPath}
              cardClipPath={item.cardClipPath}
              rotate={item.rotate}
              iconRotateClass={item.iconRotateClass}
              delay={0.1 * (index + 1)}
              className={index === 2 ? "sm:col-span-2 md:col-span-1" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

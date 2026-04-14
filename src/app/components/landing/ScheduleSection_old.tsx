import { ScheduleItem_old } from "./components/ScheduleItem_old";
import { SectionHeading } from "./components/SectionHeading";

const scheduleItems = [
  {
    time: "10:00",
    title: "Eucharystia",
    desc: "Msza święta w kościele – przyjaźń Boga z człowiekiem",
    color: "#F29BBE",
  },
  {
    time: "11:15",
    title: "Przejście do Arki",
    desc: "Integracja i wejście do namiotu głównego",
    color: "#9DA0D0",
  },
  {
    time: "11:30",
    title: "Warsztaty i budowanie ark",
    desc: "Praca w grupach, bingo, wspólna integracja",
    color: "#F9E926",
  },
  {
    time: "13:00",
    title: "Obiad i atrakcje",
    desc: "Foodtracki, namioty warsztatowe, boisko, zabawa",
    color: "#325DA8",
  },
  {
    time: "16:00",
    title: "Nauczanie i modlitwa",
    desc: "Świadectwo, modlitwa ocalenia i wyzwolenia",
    color: "#F29BBE",
  },
  {
    time: "18:00",
    title: "Kolacja i spowiedź",
    desc: "Czas wolny i możliwość spowiedzi w kościele",
    color: "#9DA0D0",
  },
  {
    time: "19:30",
    title: "Koncert NiemaGotu",
    desc: "Muzyka na żywo",
    color: "#F9E926",
  },
  {
    time: "21:00",
    title: "Modlitwa przymierza",
    desc: "Modlitwa do Ducha Świętego i namaszczenie",
    color: "#325DA8",
  },
];

type ScheduleSection_oldProps = {
  sectionId?: string;
};

export function ScheduleSection_old({ sectionId }: ScheduleSection_oldProps) {
  return (
    <section
      id={sectionId}
      className="relative overflow-hidden bg-white px-4 py-16 md:px-6 md:py-24"
    >
      <div
        className="absolute top-20 right-0 h-56 w-56 translate-x-1/2 bg-[#F29BBE]/10"
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading title="Program Festiwalu" />

        <div className="space-y-4 md:space-y-6">
          {scheduleItems.map((item, index) => (
            <ScheduleItem_old
              key={`${item.time}-${item.title}`}
              time={item.time}
              title={item.title}
              description={item.desc}
              color={item.color}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

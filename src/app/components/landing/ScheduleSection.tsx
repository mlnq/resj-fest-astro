import { motion } from "motion/react";
import { SectionHeading } from "./components/SectionHeading";

const scheduleItems = [
  {
    marker: "09:00",
    time: "9:00",
    label: "Start",
    title: "Wejście na pokład",
    desc: "Odbierasz pakiet i zaczynasz swój rejs. To Twój bilet na Arkę i pierwszy krok w stronę dnia, który naprawdę może Cię poruszyć.",
    markerColor: "var(--festival-pink)",
    tagColor: "#F9D6E5",
    tagTextColor: "#A35378",
    tilt: -1.2,
  },
  {
    marker: "10:00",
    time: "10:00",
    label: "Źródło",
    title: "Spotkanie u Źródła",
    desc: "Eucharystia o przyjaźni, która nie zawodzi. Tu wszystko się zaczyna: spokojniej, głębiej i bardziej prawdziwie niż zwykły festiwalowy start.",
    markerColor: "var(--festival-yellow)",
    tagColor: "#FCF6B8",
    tagTextColor: "#8A7C14",
    tilt: -0.8,
  },
  {
    marker: "11:15",
    time: "11:15",
    label: "Integracja",
    title: "Operacja Arka",
    desc: "Integracja na pełnej petardzie: szukanie swojej pary, wspólna wizja, bingo i rozmowy, po których lód znika szybciej niż lato nad Dojlidami.",
    markerColor: "var(--festival-blue)",
    tagColor: "#C7D9F1",
    tagTextColor: "#274B86",
    tilt: 1.1,
  },
  {
    marker: "13:00",
    time: "13:00–16:00",
    label: "Plaża",
    title: "Strefa Chill & Flow",
    desc: "Foodtrucki, siatkówka, warsztaty i czas na plaży. Przestrzeń, żeby pobyć razem, odpocząć i przeżyć ten dzień bez pośpiechu.",
    markerColor: "var(--festival-pink)",
    tagColor: "#F8C9DA",
    tagTextColor: "#A35378",
    tilt: -1,
  },
  {
    marker: "16:00",
    time: "16:00",
    label: "Świadectwo",
    title: "Moment Ocalenia",
    desc: "Mocne świadectwa chłopaków z Cenacolo o wychodzeniu z mroku i modlitwa, która podnosi, leczy i daje siłę na nowy start.",
    markerColor: "var(--festival-blue)",
    tagColor: "#D3E0F3",
    tagTextColor: "#274B86",
    tilt: 1.3,
  },
  {
    marker: "19:30",
    time: "19:30",
    label: "Koncert",
    title: "Wielki Finał",
    desc: "Koncert NiemaGotu i największa dawka energii tego lata. Finał, którego nie da się pomylić z żadnym innym letnim wydarzeniem.",
    markerColor: "var(--festival-pink)",
    tagColor: "#F9D6E5",
    tagTextColor: "#A35378",
    tilt: 1,
  },
];

type ScheduleSectionProps = {
  sectionId?: string;
};

export function ScheduleSection({ sectionId }: ScheduleSectionProps) {
  return (
    <section
      id={sectionId}
      className="bg-[#F2F5FA] px-5 py-18 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Etapy Rejsu"
          description="Zamiast suchych godzin masz plan dnia, który prowadzi od wejścia na pokład aż po wielki finał."
          className="mb-14 md:mb-18"
          titleClassName="text-center text-5xl tracking-[0.03em] text-[#2F2F29] md:text-5xl"
        />

        <div className="relative mx-auto max-w-4xl pl-22 md:pl-32">
          <div className="absolute left-8 top-6 bottom-6 w-px bg-[#D9D4C8] md:left-12" />

          <div className="space-y-16 md:space-y-20">
            {scheduleItems.map((item, index) => (
              <motion.article
                key={`${item.time}-${item.title}`}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="relative"
              >
                <div
                  className="absolute left-[-6.8rem] top-1 flex h-14 w-24 items-center justify-center px-2 text-center text-lg text-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:left-[-10rem] md:h-20 md:w-36 md:text-[2rem]"
                  style={{
                    backgroundColor: item.markerColor,
                    transform: `rotate(${item.tilt}deg)`,
                  }}
                >
                  <span
                    className="font-rejsfest leading-none tracking-[0.03em]"
                    style={{ transform: `rotate(${-item.tilt}deg)` }}
                  >
                    {item.marker}
                  </span>
                </div>

                <div className="max-w-2xl">
                  <div
                    className="mb-4 inline-flex px-3 py-2 text-sm font-black uppercase tracking-[0.03em] md:text-[0.82rem]"
                    style={{
                      backgroundColor: item.tagColor,
                      color: item.tagTextColor,
                    }}
                  >
                    {item.time} • {item.label}
                  </div>

                  <h3 className="mb-3 text-3xl leading-[1.05] font-black text-[#32322D] md:text-[2.15rem]">
                    {item.title}
                  </h3>

                  <p className="max-w-xl text-lg leading-[1.4] text-[#67645B] md:text-[1.18rem]">
                    {item.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

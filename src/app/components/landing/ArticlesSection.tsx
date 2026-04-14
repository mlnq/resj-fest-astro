import { useState } from "react";
import { ArticleCard } from "./components/ArticleCard";
import { SectionHeading } from "./components/SectionHeading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

type ArticlesSectionProps = {
  sectionId?: string;
};

const articles = [
  {
    title: "Godzina Z - nasz start",
    excerpt:
      "Podczas Godziny Z zaprezentowaliśmy nasze naklejki i poinformowaliśmy o wydarzeniu. Obecne zdjęcia w galerii pochodzą właśnie z tego spotkania.",
    date: "15 kwietnia 2026",
    color: "#DB3A34",
    content: [
      "Wielka Noc Zmartwychwstania Pańskiego, godz. 00.30, to dla nas także GODZINA „Z” jak ZMARTWYCHWSTANIE. To właśnie podczas tego radosnego uwielbienia zaprezentowaliśmy nasze naklejki i poinformowaliśmy o festiwalu.",
      "To spotkanie było pierwszym mocnym wyjściem z zaproszeniem do ludzi. Chcieliśmy nie tylko przekazać informację o wydarzeniu, ale zrobić to w atmosferze żywej radości, wspólnoty i paschalnej nadziei.",
      "Dlatego już teraz warto zaznaczyć, że zdjęcia dostępne obecnie w galerii pochodzą właśnie z tego wydarzenia. To kadry z Godziny Z, która stała się dla nas naturalnym początkiem dalszej komunikacji o festiwalu.",
      "Radosne uwielbienie, obecność ludzi i wspólne przeżywanie tej nocy dobrze pokazują kierunek całego wydarzenia. Przychodźcie i przyjeżdżajcie, bo to dopiero początek tego, co chcemy razem zbudować.",
    ],
  },
  {
    title: "Koncert NiemaGotu",
    excerpt:
      "Poznaj zespół, który zagra podczas festiwalu. Ich muzyka łączy pokolenia i niesie przesłanie nadziei.",
    date: "10 kwietnia 2026",
    color: "#9DA0D0",
    content: [
      "Wieczorny koncert będzie jednym z najmocniejszych punktów programu. Zaproszony zespół stawia na brzmienie, które jest jednocześnie energetyczne i komunikatywne, dzięki czemu dobrze działa zarówno na scenie plenerowej, jak i w bardziej modlitewnym klimacie wydarzenia.",
      "To nie jest przypadkowy booking. Szukaliśmy składu, który potrafi połączyć koncertowe doświadczenie z treścią, która nie rozmywa sensu całego dnia. Muzyka ma tu domknąć festiwal, ale też otworzyć uczestników na głębsze przeżycie wspólnoty.",
      "W repertuarze znajdą się utwory dobrze znane uczestnikom, ale też momenty bardziej kontemplacyjne. Zależy nam na tym, żeby koncert nie był tylko dodatkiem rozrywkowym, tylko pełnoprawną częścią narracji wydarzenia.",
      "Na miejscu przewidujemy przestrzeń pod sceną, strefę odpoczynku i bezpieczny przepływ uczestników między koncertem a końcową modlitwą. Dzięki temu przejście między tymi punktami programu będzie naturalne, a nie chaotyczne.",
    ],
  },
  {
    title: "Zapowiedź warsztatów",
    excerpt:
      "Dowiedz się więcej o warsztatach i atrakcjach, które przygotowaliśmy dla uczestników festiwalu.",
    date: "5 kwietnia 2026",
    color: "#7B6E10",
    content: [
      "Warsztaty są pomyślane jako przestrzeń realnego spotkania, nie tylko biernego uczestnictwa. Zamiast jednego formatu przygotowaliśmy kilka różnych ścieżek, tak żeby każdy mógł wejść w temat od strony, która jest mu najbliższa.",
      "Część aktywności będzie oparta na pracy w małych grupach, część na prostych zadaniach angażujących ruch, rozmowę i współpracę. Chcemy, żeby uczestnicy mieli okazję nie tylko słuchać, ale też budować relacje i doświadczać wspólnoty w praktyce.",
      "Na terenie wydarzenia pojawią się również dodatkowe strefy: miejsce rozmowy, przestrzeń odpoczynku, punkty aktywności oraz atrakcje, które pozwolą płynnie przechodzić między głównymi punktami programu.",
      "Pełną rozpiskę warsztatów pokażemy bliżej wydarzenia, ale już teraz wiadomo, że ich wspólnym mianownikiem będzie temat budowania, ocalenia i przymierza. To one spajają wszystkie aktywności w jedną całość.",
    ],
  },
];

export function ArticlesSection({ sectionId }: ArticlesSectionProps) {
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number | null>(null);
  const selectedArticle =
    selectedArticleIndex !== null ? articles[selectedArticleIndex] : null;

  return (
    <>
      <section
        id={sectionId}
        className="relative overflow-hidden bg-[#FEFEFE] px-4 py-16 md:px-6 md:py-24"
      >
        <div
          className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/2 bg-[#F9E926]/10"
          style={{
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHeading title="Aktualności" />

          <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.title}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                color={article.color}
                rotate={index % 2 === 0 ? -1 : 1}
                delay={index * 0.1}
                onOpen={() => setSelectedArticleIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={selectedArticle !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedArticleIndex(null);
        }}
      >
        <DialogContent className="max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-4xl gap-0 overflow-hidden border-[2px] border-[#DCE2EA] bg-[#FFFFFF] p-0 shadow-none sm:w-auto [&>button]:top-1 [&>button]:right-1 [&>button]:z-20 [&>button]:h-13 [&>button]:w-13 [&>button]:rounded-none [&>button]:border-0 [&>button]:bg-[var(--festival-violet)] [&>button]:text-white [&>button]:opacity-100 md:[&>button]:top-3 md:[&>button]:right-5 md:[&>button]:h-14 md:[&>button]:w-14 [&>button_svg]:size-8">
          {selectedArticle ? (
            <>
              <div className="grid grid-cols-1 gap-4 border-b border-[#E9EDF2] px-6 pt-10 pb-5 pr-20 md:flex md:items-center md:justify-between md:px-8 md:pt-5 md:pb-5 md:pr-8">
                <div className="flex gap-3">
                  <span className="h-4 w-4 rounded-full border-2 border-[#CDD5E0] bg-white" />
                  <span className="h-4 w-4 rounded-full border-2 border-[#CDD5E0] bg-white" />
                </div>
              
              </div>
              <DialogHeader className="items-center px-6 pt-8 pb-5 text-center md:items-start md:px-10 md:pt-10 md:text-left">

                <div
                  className="mb-4 text-[1.05rem] font-black"
                  style={{ color: selectedArticle.color }}
                >
                  {selectedArticle.date}
                </div>
                 <div
                  className="w-fit px-4 py-2 text-[0.8rem] font-black uppercase tracking-[0.14em] text-[#2E3B55] md:mr-auto"
                  style={{ backgroundColor: `${selectedArticle.color}22` }}
                >
                  Aktualność
                </div>
                <DialogTitle className="max-w-[14ch] text-[2.5rem] leading-[0.92] font-black uppercase tracking-[-0.05em] text-[#333333] md:text-[4.35rem]">
                  {selectedArticle.title}
                </DialogTitle>
                <div className="mt-7 flex w-full items-center justify-center gap-4">
                  <div
                    className="h-[2px] w-24"
                    style={{ backgroundColor: `${selectedArticle.color}55` }}
                  />
                  <div
                    className="h-3 w-3 rotate-45"
                    style={{ backgroundColor: selectedArticle.color }}
                  />
                  <div
                    className="h-[2px] w-24"
                    style={{ backgroundColor: `${selectedArticle.color}55` }}
                  />
                </div>
              </DialogHeader>
              <ScrollArea className="h-[54vh] px-6 pb-8 md:px-10 md:pb-10">
                <div className="space-y-7 pr-4">
                  <DialogDescription className="text-[1.22rem] leading-9 text-[#505A6D] md:text-[1.38rem] md:leading-10">
                    <span
                      className="float-left mr-3 text-[4.25rem] leading-none font-black"
                      style={{ color: selectedArticle.color }}
                    >
                      {selectedArticle.excerpt.charAt(0)}
                    </span>
                    {selectedArticle.excerpt.slice(1)}
                  </DialogDescription>

                  {selectedArticle.content.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={`text-[1.12rem] leading-9 text-[#484F5D] md:text-[1.22rem] md:leading-10 ${
                        index === 0 ? "pt-1" : ""
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

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
    color: "#F29BBE",
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
    color: "#F9E926",
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
        className="relative overflow-hidden bg-[#F8F6EF] px-4 py-16 md:px-6 md:py-24"
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
        <DialogContent className="max-h-[85vh] max-w-3xl gap-0 overflow-hidden border-0 bg-white p-0 shadow-2xl">
          {selectedArticle ? (
            <>
              <div
                className="h-2 w-full"
                style={{ backgroundColor: selectedArticle.color }}
              />
              <DialogHeader className="border-b border-black/10 px-6 pt-6 pb-4 md:px-8">
                <div
                  className="mb-3 text-sm font-bold"
                  style={{ color: selectedArticle.color }}
                >
                  {selectedArticle.date}
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900 md:text-4xl">
                  {selectedArticle.title}
                </DialogTitle>
                <DialogDescription className="text-base leading-relaxed text-gray-700 md:text-lg">
                  {selectedArticle.excerpt}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[50vh] px-6 py-6 md:px-8">
                <div className="space-y-5 pr-4">
                  {selectedArticle.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-gray-800 md:text-lg"
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

import { SectionHeading } from "./components/SectionHeading";
import { withBasePath } from "../../utils/assets";

type ProgramPreviewSectionProps = {
  sectionId?: string;
};

const previewItems = [
  { time: "10:00", title: "Eucharystia i otwarcie dnia" },
  { time: "13:00", title: "Strefa warsztatów, relacji i atrakcji" },
  { time: "19:30", title: "Koncert NiemaGotu i finał wydarzenia" },
] as const;

export function ProgramPreviewSection({ sectionId }: ProgramPreviewSectionProps) {
  return (
    <section id={sectionId} className="bg-[#FFFFFF] px-5 py-18 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Program"
          titleClassName="text-5xl tracking-[0.03em] md:text-5xl"
          description="Na stronie głównej zostawiamy szybki skrót. Pełny harmonogram dnia znajdziesz na osobnej podstronie."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {previewItems.map((item) => (
            <article
              key={item.time}
              className="bg-[#F1F4F8] p-6 shadow-[0_12px_32px_rgba(33,49,78,0.10)]"
              style={{ clipPath: "polygon(1% 0, 100% 1%, 99% 100%, 0 99%)" }}
            >
              <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[var(--festival-violet)]">
                {item.time}
              </p>
              <h3 className="text-2xl font-black tracking-[-0.03em] text-[#2A2F3B]">
                {item.title}
              </h3>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={withBasePath("/program")}
            className="inline-flex bg-[var(--festival-violet)] px-8 py-4 text-lg font-black uppercase text-white shadow-lg hover:bg-[#8689BF]"
            style={{ clipPath: "polygon(2% 0, 100% 0, 98% 100%, 0 100%)" }}
          >
            Zobacz pełny program
          </a>
        </div>
      </div>
    </section>
  );
}

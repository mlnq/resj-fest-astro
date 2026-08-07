import { motion } from "motion/react";
import { BookOpen, Dumbbell, MessageCircle, type LucideIcon } from "lucide-react";
import scheduleJson from "../../../data/schedule.json";
import archbishopImage from "../../../assets/imports/arcybiskup.jpg";
import agnieszkaImage from "../../../assets/imports/aga-kucharewicz.png";
import throneOfLambImage from "../../../assets/imports/tron-baranka.jpg";
import awsdImage from "../../../assets/imports/awsd.jpeg";
import crossfitImage from "../../../assets/imports/crossfit.png";
import domJednegoSercaImage from "../../../assets/imports/dom-jednego-serca.png";
import djImage from "../../../assets/imports/dj.png";
import jakimowiczImage from "../../../assets/imports/jakimowicz.png";
import jestProgressImage from "../../../assets/imports/jest-progress.png";
import kopciewskiImage from "../../../assets/imports/kopciewski.png";
import ministersImage from "../../../assets/imports/ministanci.jpg.webp";
import niemagotuImage from "../../../assets/imports/niemagotu.png";
import piorkowskiImage from "../../../assets/imports/sj-piórkowski.png";
import szmurloImage from "../../../assets/imports/szmurlo.png";
import tymekImage from "../../../assets/imports/tymek.png";
import vrPlaceOfWordImage from "../../../assets/imports/vr-miejsce-slowa.png";
import wyrwaniImage from "../../../assets/imports/wyrwani-z-niewoli.png";
import { assetUrl } from "../../utils/assets";
import { SectionHeading } from "./components/SectionHeading";

type ImageReference = { source: string; alt: string; imageType?: "person" | "logo" };
type ScheduleDetail = { label: string; text: string; image?: string; imageAlt?: string; imageType?: "person" | "logo"; images?: ImageReference[] };
type ScheduleItem = { time: string; title: string; description: string; details?: ScheduleDetail[] };
type WorkshopItem = { title: string; description?: string; presenters?: string[]; image?: string; imageAlt?: string; imageType?: "person" | "logo" };
type WorkshopBlock = { label: string; time: string; items: WorkshopItem[] };
type WorkshopZone = {
  id: string;
  title: string;
  blocks: WorkshopBlock[];
  continuous?: { label: string; time: string; items: WorkshopItem[] };
};
type ScheduleData = {
  intro: { title: string; description: string };
  mainSchedule: ScheduleItem[];
  workshops: {
    timeRange: string;
    title: string;
    description: string;
    zones: WorkshopZone[];
    speakers: { initials: string; name: string; description: string; image?: string; imageAlt?: string; imageType?: "person" | "logo" }[];
    fun: { title: string; availability: string; description: string; heading: string; activities: string[] };
  };
};

const schedule = scheduleJson as ScheduleData;

const scheduleImages: Record<string, string> = {
  agnieszka: assetUrl(agnieszkaImage),
  archbishop: assetUrl(archbishopImage),
  throneOfLamb: assetUrl(throneOfLambImage),
  awsd: assetUrl(awsdImage),
  crossfit: assetUrl(crossfitImage),
  freedFromCaptivity: assetUrl(wyrwaniImage),
  jakimowicz: assetUrl(jakimowiczImage),
  jestProgress: assetUrl(jestProgressImage),
  kopciewski: assetUrl(kopciewskiImage),
  ministers: assetUrl(ministersImage),
  niemagotu: assetUrl(niemagotuImage),
  oneHeartHome: assetUrl(domJednegoSercaImage),
  piorkowski: assetUrl(piorkowskiImage),
  placeOfWord: assetUrl(vrPlaceOfWordImage),
  szmurlo: assetUrl(szmurloImage),
  tymek: assetUrl(tymekImage),
  dj: assetUrl(djImage),
};

const zoneDecorations: Record<string, {
  color: string;
  icon: LucideIcon;
  rotate: number;
  iconClipPath: string;
  cardClipPath: string;
}> = {
  meetings: {
    color: "#E86C9D",
    icon: MessageCircle,
    rotate: -2,
    iconClipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
    cardClipPath: "polygon(1% 0, 100% 2%, 99% 100%, 0 98%)",
  },
  active: {
    color: "#325DA8",
    icon: Dumbbell,
    rotate: 1,
    iconClipPath: "polygon(0 5%, 95% 0, 100% 95%, 5% 100%)",
    cardClipPath: "polygon(0 1%, 99% 0, 100% 99%, 1% 100%)",
  },
  spiritual: {
    color: "#503967",
    icon: BookOpen,
    rotate: -1,
    iconClipPath: "polygon(0 0, 95% 5%, 100% 100%, 5% 95%)",
    cardClipPath: "polygon(2% 0, 100% 1%, 98% 100%, 0 99%)",
  },
};

type ScheduleSectionProps = { sectionId?: string };

function ScheduleImages({ images, sizeClass }: { images: ImageReference[]; sizeClass: string }) {
  const availableImages = images.filter((image) => scheduleImages[image.source]);
  if (availableImages.length === 0) return null;

  return <div className="flex shrink-0 -space-x-2">{availableImages.map((image) => <img key={image.source} src={scheduleImages[image.source]} alt={image.alt} className={`${sizeClass} ${image.imageType === "person" ? "rounded-full ring-2 ring-white object-cover" : "rounded-lg border border-[#C9C2B8] bg-white p-1 object-contain"} shadow-[2px_3px_0_rgba(80,57,103,0.15)]`} />)}</div>;
}

function WorkshopItems({ items }: { items: WorkshopItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={`${item.title}-${item.description ?? ""}`} className={item.image ? "flex items-start justify-between gap-3" : undefined}>
          <div><p className="text-base leading-[1.5] text-[#403B43]">{item.title}</p>{item.description && <p className="text-sm leading-[1.45] text-[#5B5660]">{item.description}</p>}{item.presenters?.map((presenter) => <strong key={presenter} className="block text-base font-black leading-[1.5] text-[#29242C]">{presenter}</strong>)}</div>
          {item.image && <ScheduleImages images={[{ source: item.image, alt: item.imageAlt ?? item.title, imageType: item.imageType }]} sizeClass="h-20 w-20 md:h-[5.5rem] md:w-[5.5rem]" />}
        </div>
      ))}
    </div>
  );
}

export function ScheduleSection({ sectionId }: ScheduleSectionProps) {
  const { intro, mainSchedule, workshops } = schedule;

  return (
    <section id={sectionId} className="bg-[#F2F5FA] px-5 py-18 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={intro.title} description={intro.description} className="mb-14 md:mb-18" titleClassName="text-center text-5xl tracking-[0.03em] text-[#2F2F29] md:text-5xl" />
        <div className="relative mx-auto max-w-4xl">
          <div aria-hidden="true" className="absolute left-[2.9rem] top-6 bottom-6 w-px bg-[#B8AEC2] md:left-[4.1rem]" />
          <div className="space-y-8 md:space-y-9">
            {mainSchedule.map((item, index) => (
              <motion.article key={`${item.time}-${item.title}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.4, delay: index * 0.04 }} className="relative grid grid-cols-[5.8rem_1fr] gap-5 md:grid-cols-[8.2rem_1fr] md:gap-8">
                <div className="z-10 flex h-12 items-center justify-center bg-[#503967] px-3 font-rejsfest text-xl leading-none text-white shadow-[0_4px_0_rgba(80,57,103,0.18)] md:h-[3.75rem] md:px-5 md:text-[1.7rem]">{item.time}</div>
                <div className="border-b border-[#C9C2B8] pb-8">
                  <h3 className="mb-2 text-2xl leading-[1.05] font-black text-[#32322D] md:text-[1.75rem]">{item.title}</h3>
                  {item.description && <p className="text-base leading-[1.5] text-[#45413B] md:text-[1.05rem]">{item.description}</p>}
                  {item.details && <div className="mt-6 flex flex-wrap gap-5">{item.details.map((detail) => <div key={detail.label} className="flex min-w-[16rem] flex-1 items-center gap-4"><ScheduleImages images={[...(detail.image ? [{ source: detail.image, alt: detail.imageAlt ?? detail.text, imageType: detail.imageType }] : []), ...(detail.images ?? [])]} sizeClass="h-20 w-20 md:h-24 md:w-24" /><div className="min-w-0"><p className="text-xs font-black uppercase tracking-[0.08em] text-[#625C69]">{detail.label}</p><p className="text-sm leading-[1.4] font-semibold text-[#403B43]">{detail.text}</p></div></div>)}</div>}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t-2 border-[#503967] pt-12 pb-12">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-3">
            <div><p className="mb-2 text-sm font-black uppercase tracking-[0.08em] text-[#8E3D65]">{workshops.timeRange}</p><h3 className="font-rejsfest text-4xl leading-none uppercase tracking-[0.04em] text-[#32322D]">{workshops.title}</h3></div>
            <p className="max-w-md text-base leading-[1.4] text-[#45413B]">{workshops.description}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {workshops.zones.map((zone, index) => {
              const decoration = zoneDecorations[zone.id];
              const Icon = decoration.icon;

              return (
                <motion.article key={zone.id} initial={{ opacity: 0, y: 28, rotate: decoration.rotate }} whileInView={{ opacity: 1, y: 0, rotate: decoration.rotate }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.45, delay: index * 0.08 }} whileHover={{ rotate: 0, scale: 1.03 }} className="relative bg-white p-6 shadow-xl md:p-7" style={{ clipPath: decoration.cardClipPath }}>
                  <div className="mb-7 flex items-center gap-5"><div className="flex h-16 w-16 shrink-0 items-center justify-center" style={{ backgroundColor: decoration.color, clipPath: decoration.iconClipPath }}><Icon className="h-8 w-8 text-white" strokeWidth={2.25} /></div><h4 className="font-rejsfest text-2xl leading-[0.95] uppercase tracking-[0.04em] text-[#32322D]">{zone.title}</h4></div>
                  <div className="space-y-6">
                    {zone.blocks.map((block) => <div key={block.time} className="border-l-2 pl-4" style={{ borderColor: decoration.color }}><p className="mb-2 font-sans text-sm font-black uppercase tracking-[0.04em]" style={{ color: decoration.color }}>{block.label} <span className="mx-1 opacity-60">·</span> {block.time}</p><WorkshopItems items={block.items} /></div>)}
                    {zone.continuous && <div className="border-t border-[#DED9E0] pt-5"><p className="mb-2 text-xs font-black uppercase tracking-[0.1em]" style={{ color: decoration.color }}>{zone.continuous.label} · {zone.continuous.time}</p><WorkshopItems items={zone.continuous.items} /></div>}
                  </div>
                </motion.article>
              );
            })}
          </div>

          <section className="mt-10"><p className="mb-4 font-rejsfest text-2xl uppercase tracking-[0.04em] text-[#503967]">Prowadzący warsztaty</p><div className="grid gap-4 md:grid-cols-3">{workshops.speakers.map((speaker) => <article key={speaker.name} className="flex items-start gap-5 rounded-[1.1rem] border border-[#D4CDD7] bg-white p-5 shadow-[3px_4px_0_rgba(80,57,103,0.12)]">{speaker.image ? <ScheduleImages images={[{ source: speaker.image, alt: speaker.imageAlt ?? speaker.name, imageType: speaker.imageType }]} sizeClass="h-24 w-24 md:h-[6.5rem] md:w-[6.5rem]" /> : <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#503967] text-xs font-black tracking-wide text-white">{speaker.initials}</span>}<p className="text-sm leading-[1.45] text-[#4A454D]"><strong className="block text-base text-[#322D35]">{speaker.name}</strong>{speaker.description}</p></article>)}</div></section>

          <div className="paper-grain mt-10 bg-[#CDB6D5] px-6 py-7 text-[#302C42] shadow-xl md:px-8 md:py-8" style={{ clipPath: "polygon(1% 0, 100% 1%, 99% 100%, 0 98%)" }}>
            <div className="mb-4 flex flex-wrap items-baseline gap-x-5 gap-y-2"><p className="font-rejsfest text-3xl leading-none uppercase tracking-[0.04em]">{workshops.fun.title}</p><p className="text-xs font-black uppercase tracking-[0.1em] text-[#503967]">{workshops.fun.availability}</p></div>
            <p className="mb-5 max-w-2xl text-base leading-[1.55] text-[#3E3A52]">{workshops.fun.description}</p>
            <ul className="flex flex-wrap gap-2.5">{workshops.fun.activities.map((activity) => <li key={activity} className="bg-white/50 px-3 py-2 text-sm font-semibold text-[#373247]">{activity}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

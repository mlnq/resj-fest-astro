import image0269 from "../../../assets/imports/godzinaZ/0269-041A8177.jpg";
import image0272 from "../../../assets/imports/godzinaZ/0272-041A8190.jpg";
import image0276 from "../../../assets/imports/godzinaZ/0276-041A8208.jpg";
import image0285 from "../../../assets/imports/godzinaZ/0285-041A8225.jpg";
import image0293 from "../../../assets/imports/godzinaZ/0293-041A8242.jpg";
import image0302 from "../../../assets/imports/godzinaZ/0302-041A8268.jpg";
import image0306 from "../../../assets/imports/godzinaZ/0306-041A8276.jpg";
import image0309 from "../../../assets/imports/godzinaZ/0309-041A8280.jpg";
import { assetUrl } from "../../utils/assets";

export const galleryMoments = [
  {
    title: "Wejście na festiwal",
    caption: "Pierwsze spotkania, rejestracja i poranny ruch przy wejściu.",
    tag: "Start dnia",
    imageSrc: assetUrl(image0269),
    rotate: -2,
    size: "large",
  },
  {
    title: "Scena główna",
    caption: "Muzyka, konferencje i wspólna energia pod sceną.",
    tag: "Scena",
    imageSrc: assetUrl(image0272),
    rotate: 1,
    size: "medium",
  },
  {
    title: "Warsztaty",
    caption: "Małe grupy, rozmowy i konkretne doświadczenie wspólnoty.",
    tag: "Warsztaty",
    imageSrc: assetUrl(image0276),
    rotate: -1,
    size: "small",
  },
  {
    title: "Modlitwa wieczorna",
    caption: "Skupienie, światło i przestrzeń na ciszę pod koniec dnia.",
    tag: "Modlitwa",
    imageSrc: assetUrl(image0285),
    rotate: 2,
    size: "medium",
  },
  {
    title: "Strefa relacji",
    caption: "Rozmowy przy stolikach i chwile pomiędzy punktami programu.",
    tag: "Ludzie",
    imageSrc: assetUrl(image0293),
    rotate: 1,
    size: "small",
  },
  {
    title: "Widok z góry",
    caption: "Szeroki plan całego terenu i festiwalowego układu stref.",
    tag: "Panorama",
    imageSrc: assetUrl(image0302),
    rotate: -2,
    size: "large",
  },
  {
    title: "Wspólny śpiew",
    caption: "Moment, w którym tłum naprawdę staje się jedną wspólnotą.",
    tag: "Muzyka",
    imageSrc: assetUrl(image0306),
    rotate: 2,
    size: "medium",
  },
  {
    title: "Zaplecze wolontariuszy",
    caption: "Cicha logistyka i ludzie, którzy składają całość w jeden dzień.",
    tag: "Kulisy",
    imageSrc: assetUrl(image0309),
    rotate: -1,
    size: "small",
  },
];

export const galleryCollections = [
  {
    title: "Scena i koncert",
    description: "Kadry ze sceny, światła, tłumu i wieczornego koncertu.",
    count: "38 zdjęć",
    accentClassName: "bg-[var(--festival-violet)]",
  },
  {
    title: "Modlitwa i Eucharystia",
    description: "Najmocniejsze momenty skupienia, wspólnej modlitwy i liturgii.",
    count: "24 zdjęcia",
    accentClassName: "bg-[#F29BBE]",
  },
  {
    title: "Warsztaty i relacje",
    description: "Praca w grupach, rozmowy i naturalne spotkania między uczestnikami.",
    count: "31 zdjęć",
    accentClassName: "bg-[#F9E926]",
  },
];

export const galleryStats = [
  { value: "90+", label: "kadrów z dnia" },
  { value: "4", label: "strefy wydarzenia" },
  { value: "1", label: "pełna fotorelacja" },
];

export const galleryPreviewItems = galleryMoments.map((item) => ({
  imageSrc: item.imageSrc,
  title: item.title,
  caption: item.caption,
  rotate: item.rotate,
}));

import lodzSvg from "../../assets/imports/lodz.svg";
import palmaSvg from "../../assets/imports/palma.svg";
import { GalleryCollectionsSection } from "../components/gallery/GalleryCollectionsSection";
import { GalleryCtaSection } from "../components/gallery/GalleryCtaSection";
import { GalleryHeroSection } from "../components/gallery/GalleryHeroSection";
import { GalleryMomentsSection } from "../components/gallery/GalleryMomentsSection";
import { GalleryStatsSection } from "../components/gallery/GalleryStatsSection";
import { assetUrl } from "../utils/assets";

export function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#FFF9E6]">
      <GalleryHeroSection palmaSrc={assetUrl(palmaSvg)} lodzSrc={assetUrl(lodzSvg)} />
      <GalleryStatsSection />
      <GalleryCollectionsSection />
      <GalleryMomentsSection />
      <GalleryCtaSection />
    </main>
  );
}

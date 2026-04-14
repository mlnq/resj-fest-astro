import { useEffect, useRef, useState } from "react";
import { useMotionValue, useScroll, useTransform } from "motion/react";
import logoSvg from "../../assets/imports/logo.svg";
import topBarLogoSvg from "../../assets/imports/resjFestLogo.svg";
import lodzSvg from "../../assets/imports/lodz.svg";
import palmaSvg from "../../assets/imports/palma.svg";
import rybaSvg from "../../assets/imports/ryba.svg";
import wodaSvg from "../../assets/imports/woda.svg";
import heroBackground from "../../assets/imports/godzinaZ/0302-041A8268.jpg";
import { assetUrl } from "../utils/assets";
import { ArticlesSection } from "../components/landing/ArticlesSection";
import { FinalCtaSection } from "../components/landing/FinalCtaSection";
import { GallerySection } from "../components/landing/GallerySection";
import { HeroSection } from "../components/landing/HeroSection";
import { InfoHubSection } from "../components/landing/InfoHubSection";
import { LocationSection } from "../components/landing/LocationSection";
import { NiemaGotuSection } from "../components/landing/NiemaGotuSection";
import { ProgramPreviewSection } from "../components/landing/ProgramPreviewSection";
import { SiteFooter } from "../components/landing/SiteFooter";
import { ThemeSection } from "../components/landing/ThemeSection";
import { DesktopTopBar } from "../components/landing/components/DesktopTopBar";
import { MobilePanelNav } from "../components/landing/components/MobilePanelNav";
import { NextSectionButton } from "../components/landing/components/NextSectionButton";

const sectionOrder = [
  "start",
  "historia",
  "aktualnosci",
  "galeria",
  "plan",
  "koncert",
  "miejsce",
  "info",
  "zapisy",
] as const;

const navSectionOrder = ["start", "historia", "plan", "miejsce", "zapisy"] as const;

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSectionId, setActiveSectionId] = useState<string>(sectionOrder[0]);
  const [isTopBarVisible, setIsTopBarVisible] = useState(false);
  const [nextSectionId, setNextSectionId] = useState<string | null>(sectionOrder[1]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    container: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const topBarOpacity = useMotionValue(0);
  const topBarY = useMotionValue(-24);

  useEffect(() => {
    const updateTopBarVisibility = () => {
      const heroElement = heroRef.current;
      if (!heroElement) return;

      const { bottom } = heroElement.getBoundingClientRect();
      setIsTopBarVisible(bottom <= window.innerHeight - 120);
    };

    updateTopBarVisibility();
    window.addEventListener("scroll", updateTopBarVisibility, { passive: true });
    window.addEventListener("resize", updateTopBarVisibility);

    return () => {
      window.removeEventListener("scroll", updateTopBarVisibility);
      window.removeEventListener("resize", updateTopBarVisibility);
    };
  }, []);

  useEffect(() => {
    topBarOpacity.set(isTopBarVisible ? 1 : 0);
    topBarY.set(isTopBarVisible ? 0 : -24);
  }, [isTopBarVisible, topBarOpacity, topBarY]);

  useEffect(() => {
    const updateNextSection = () => {
      const sections = sectionOrder
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);
      const navSections = navSectionOrder
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (sections.length === 0) {
        setNextSectionId(null);
        return;
      }

      const marker = window.scrollY + window.innerHeight * 0.35;
      const currentIndex = sections.findLastIndex(
        (section) => section.offsetTop <= marker,
      );
      const currentNavIndex = navSections.findLastIndex(
        (section) => section.offsetTop <= marker,
      );
      const currentSection = navSections[Math.max(currentNavIndex, 0)] ?? navSections[0];
      const nextSection = sections[currentIndex + 1] ?? null;

      setActiveSectionId(currentSection.id);
      setNextSectionId(nextSection?.id ?? null);
    };

    updateNextSection();
    window.addEventListener("scroll", updateNextSection, { passive: true });
    window.addEventListener("resize", updateNextSection);

    return () => {
      window.removeEventListener("scroll", updateNextSection);
      window.removeEventListener("resize", updateNextSection);
    };
  }, []);

  const handleScrollToNextSection = () => {
    if (!nextSectionId) return;

    const nextSection = document.getElementById(nextSectionId);
    if (!nextSection) return;

    const targetTop = nextSection.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-y-auto bg-[#FFF9E6] pb-28 md:pb-0"
    >
      <DesktopTopBar
        activeSectionId={activeSectionId}
        logoSrc={assetUrl(topBarLogoSvg)}
        heroRef={heroRef}
        opacity={topBarOpacity}
        y={topBarY}
        isSolid={isTopBarVisible}
      />
      <MobilePanelNav />
      <HeroSection
        heroRef={heroRef}
        sectionId="start"
        logoSrc={assetUrl(logoSvg)}
        heroBackgroundSrc={assetUrl(heroBackground)}
        lodzSrc={assetUrl(lodzSvg)}
        wodaSrc={assetUrl(wodaSvg)}
        palmaSrc={assetUrl(palmaSvg)}
        rybaSrc={assetUrl(rybaSvg)}
        y1={y1}
        y2={y2}
        y3={y3}
        opacity={opacity}
      />
      <ThemeSection
        sectionId="historia"
        lodzSrc={assetUrl(lodzSvg)}
        rybaSrc={assetUrl(rybaSvg)}
        wodaSrc={assetUrl(wodaSvg)}
      />
      <ArticlesSection sectionId="aktualnosci" />
      <GallerySection sectionId="galeria" />
      <ProgramPreviewSection sectionId="plan" />
      <NiemaGotuSection sectionId="koncert" />
      <LocationSection sectionId="miejsce" />
      <InfoHubSection sectionId="info" />
      <FinalCtaSection
        sectionId="zapisy"
        palmaSrc={assetUrl(palmaSvg)}
        lodzSrc={assetUrl(lodzSvg)}
        wodaSrc={assetUrl(wodaSvg)}
      />
      <SiteFooter />
      <NextSectionButton
        hidden={nextSectionId === null}
        onClick={handleScrollToNextSection}
      />
    </div>
  );
}

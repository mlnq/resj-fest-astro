import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { SectionHeading } from "../landing/components/SectionHeading";
import { galleryMoments } from "./galleryData";
import { GalleryMomentCard } from "./components/GalleryMomentCard";

export function GalleryMomentsSection() {
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <>
      <section className="relative overflow-hidden bg-[#FFF9E6] px-4 py-16 md:px-6 md:py-24">
        <div
          className="absolute top-0 left-0 h-56 w-56 -translate-x-1/3 -translate-y-1/3 bg-[#F29BBE]/10"
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHeading
            title="Wybrane momenty"
            description="Kliknięcie zdjęcia otwiera teraz podgląd galerii. To już nie są placeholdery, tylko tymczasowe assety przygotowane pod późniejszą integrację z bazą."
          />

          <div className="grid items-start gap-4 md:grid-cols-3 md:gap-6">
            {galleryMoments.map((moment, index) => (
              <GalleryMomentCard
                key={moment.title}
                title={moment.title}
                caption={moment.caption}
                tag={moment.tag}
                imageSrc={moment.imageSrc}
                rotate={moment.rotate}
                size={moment.size as "small" | "medium" | "large"}
                delay={index * 0.06}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        open={currentIndex >= 0}
        close={() => setCurrentIndex(-1)}
        index={currentIndex >= 0 ? currentIndex : 0}
        slides={galleryMoments.map((moment) => ({
          src: moment.imageSrc,
          alt: moment.title,
          title: moment.title,
          description: moment.caption,
        }))}
      />
    </>
  );
}

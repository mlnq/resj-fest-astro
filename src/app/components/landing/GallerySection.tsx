import { useState } from "react";
import { motion } from "motion/react";
import Lightbox from "yet-another-react-lightbox";
import { galleryPreviewItems } from "../gallery/galleryData";
import { withBasePath } from "../../utils/assets";
import { CutoutButton } from "./components/CutoutButton";
import { GalleryTile } from "./components/GalleryTile";
import { SectionHeading } from "./components/SectionHeading";

type GallerySectionProps = {
  sectionId?: string;
};

export function GallerySection({ sectionId }: GallerySectionProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <>
      <section
        id={sectionId}
        className="relative bg-[#F1F4F8] px-4 py-16 md:px-6 md:py-24"
      >
        <div
          className="absolute bottom-0 left-0 h-48 w-48 bg-[#325DA8]/10"
          style={{ clipPath: "polygon(0 50%, 50% 0, 100% 50%, 50% 100%)" }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeading
            title="Fotorelacje"
            titleClassName="text-5xl tracking-[0.03em] md:text-5xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-2xl text-center text-base text-gray-700 md:text-lg"
          >
            Na stronie głównej też możesz już kliknąć zdjęcie i zobaczyć je w
            powiększeniu. Pełna galeria pozostaje dostępna na osobnej stronie.
          </motion.p>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {galleryPreviewItems.map((item, index) => (
              <GalleryTile
                key={`${item.title}-${index}`}
                imageSrc={item.imageSrc}
                title={item.title}
                rotate={item.rotate}
                delay={index * 0.05}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center md:mt-12"
          >
            <CutoutButton
              variant="blue"
              className="px-8 py-3 text-sm md:px-10 md:py-4 md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.location.href = withBasePath("/galeria");
              }}
            >
              Otwórz pełną galerię
            </CutoutButton>
          </motion.div>
        </div>
      </section>

      <Lightbox
        open={currentIndex >= 0}
        close={() => setCurrentIndex(-1)}
        index={currentIndex >= 0 ? currentIndex : 0}
        slides={galleryPreviewItems.map((item) => ({
          src: item.imageSrc,
          alt: item.title,
          title: item.title,
          description: item.caption,
        }))}
      />
    </>
  );
}

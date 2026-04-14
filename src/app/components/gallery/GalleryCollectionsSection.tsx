import { galleryCollections } from "./galleryData";
import { GalleryCollectionCard } from "./components/GalleryCollectionCard";
import { SectionHeading } from "../landing/components/SectionHeading";

export function GalleryCollectionsSection() {
  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Sekcje galerii"
          description="Galeria została podzielona na logiczne bloki, żeby użytkownik nie przeglądał wszystkiego w jednym, płaskim układzie."
        />

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {galleryCollections.map((collection, index) => (
            <GalleryCollectionCard
              key={collection.title}
              title={collection.title}
              description={collection.description}
              count={collection.count}
              accentClassName={collection.accentClassName}
              delay={index * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

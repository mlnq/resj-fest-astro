import { CutoutButton } from "../landing/components/CutoutButton";
import { SectionHeading } from "../landing/components/SectionHeading";
import { withBasePath } from "../../utils/assets";

export function GalleryCtaSection() {
  return (
    <section className="bg-white px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading
          title="Chcesz wrócić do programu?"
          description="Po galerii użytkownik powinien mieć prostą drogę z powrotem na landing page i do głównych informacji o wydarzeniu."
          className="mb-10"
        />
        <div className="flex justify-center">
          <CutoutButton
            variant="blue"
            className="px-10 py-3 text-base md:px-12 md:py-4 md:text-lg"
            whileHover={{ scale: 1.05, rotate: -1 }}
            onClick={() => {
              window.location.href = withBasePath("/");
            }}
          >
            Zobacz stronę główną
          </CutoutButton>
        </div>
      </div>
    </section>
  );
}

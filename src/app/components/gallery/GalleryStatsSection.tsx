import { motion } from "motion/react";
import { galleryStats } from "./galleryData";

export function GalleryStatsSection() {
  return (
    <section className="bg-[#FFF9E6] px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3 md:gap-6">
        {galleryStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="bg-white p-6 text-center shadow-md"
            style={{ clipPath: "polygon(1% 0, 100% 1%, 99% 100%, 0 99%)" }}
          >
            <div className="text-3xl font-bold text-gray-900 md:text-4xl">
              {stat.value}
            </div>
            <div className="mt-2 text-sm uppercase tracking-[0.18em] text-gray-600">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

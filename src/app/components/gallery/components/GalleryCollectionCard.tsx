import { motion } from "motion/react";

type GalleryCollectionCardProps = {
  title: string;
  description: string;
  count: string;
  accentClassName: string;
  delay: number;
};

export function GalleryCollectionCard({
  title,
  description,
  count,
  accentClassName,
  delay,
}: GalleryCollectionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="relative overflow-hidden bg-white p-6 shadow-lg md:p-8"
      style={{ clipPath: "polygon(1% 0, 100% 2%, 99% 100%, 0 98%)" }}
    >
      <div className={`absolute top-0 left-0 h-2 w-full ${accentClassName}`} />
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-gray-600">
        {count}
      </p>
      <h3 className="mb-3 text-2xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.article>
  );
}

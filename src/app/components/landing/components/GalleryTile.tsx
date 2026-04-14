import { motion } from "motion/react";

type GalleryTileProps = {
  imageSrc: string;
  title: string;
  rotate: number;
  delay: number;
  onClick?: () => void;
};

export function GalleryTile({
  imageSrc,
  title,
  rotate,
  delay,
  onClick,
}: GalleryTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
      onClick={onClick}
      className="group relative aspect-square cursor-pointer overflow-hidden shadow-lg"
      style={{ clipPath: "polygon(2% 0, 100% 1%, 98% 100%, 0 99%)" }}
    >
      <img src={imageSrc} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/30" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
        <div
          className="flex h-12 w-12 items-center justify-center bg-white md:h-16 md:w-16"
          style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0 100%)" }}
        >
          <svg
            className="h-6 w-6 text-gray-900 md:h-8 md:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

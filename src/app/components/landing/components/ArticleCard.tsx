import { motion } from "motion/react";

type ArticleCardProps = {
  title: string;
  excerpt: string;
  date: string;
  color: string;
  rotate: number;
  delay: number;
  onOpen: () => void;
};

export function ArticleCard({
  title,
  excerpt,
  date,
  color,
  rotate,
  delay,
  onOpen,
}: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ rotate: 0, y: -8 }}
      className="relative cursor-pointer overflow-hidden bg-white p-6 shadow-lg md:p-8"
      style={{ clipPath: "polygon(1% 0, 100% 2%, 99% 100%, 0 98%)" }}
    >
      <div
        className="absolute top-0 right-0 h-24 w-24 opacity-20"
        style={{
          backgroundColor: color,
          clipPath: "polygon(50% 0, 100% 0, 100% 100%)",
        }}
      />
      <div className="mb-3 text-sm font-bold" style={{ color }}>
        {date}
      </div>
      <h3 className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
        {title}
      </h3>
      <p className="mb-4 leading-relaxed text-gray-700">{excerpt}</p>
      <button
        type="button"
        onClick={onOpen}
        className="font-bold text-gray-900 hover:underline"
      >
        Czytaj więcej →
      </button>
    </motion.article>
  );
}

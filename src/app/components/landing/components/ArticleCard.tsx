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
      className="group relative cursor-pointer overflow-hidden border-[2px] border-[#E3E8F0] bg-[#FFFFFF] p-7 md:p-8"
      style={{ borderRadius: "2px" }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-3">
          <span className="h-4 w-4 rounded-full border-2 border-[#D8DDE8] bg-[#FEFEFE]" />
          <span className="h-4 w-4 rounded-full border-2 border-[#D8DDE8] bg-[#FEFEFE]" />
        </div>
        <div className="h-[2px] flex-1 translate-y-[-1px] bg-[#EEF2F6]" />
      </div>

      <div className="mb-5 text-[1.05rem] font-black" style={{ color }}>
        {date}
      </div>

      <h3 className="mb-4 text-[2rem] leading-[1.02] font-black tracking-[-0.04em] text-[#2E3B55] md:text-[2.25rem]">
        {title}
      </h3>

      <p className="mb-8 max-w-[24ch] text-[1.08rem] leading-8 text-[#56657F]">
        {excerpt}
      </p>

      <button
        type="button"
        onClick={onOpen}
        className="inline-flex items-center gap-3 text-[0.95rem] font-black uppercase tracking-[0.12em] text-[#2E3B55]"
      >
        <span>Czytaj więcej</span>
        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </button>
    </motion.article>
  );
}

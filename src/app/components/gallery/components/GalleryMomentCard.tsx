import { motion } from "motion/react";
import { cn } from "../../ui/utils";

type GalleryMomentCardProps = {
  title: string;
  caption: string;
  tag: string;
  imageSrc: string;
  rotate: number;
  delay: number;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
};

const sizeClasses = {
  small: "min-h-[220px] md:col-span-1",
  medium: "min-h-[280px] md:col-span-1",
  large: "min-h-[320px] md:col-span-2",
} as const;

export function GalleryMomentCard({
  title,
  caption,
  tag,
  imageSrc,
  rotate,
  delay,
  size = "medium",
  onClick,
}: GalleryMomentCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ rotate: 0, y: -6, scale: 1.01 }}
      onClick={onClick}
      className={cn(
        "relative self-start overflow-hidden p-6 text-white shadow-xl",
        onClick && "cursor-pointer",
        sizeClasses[size],
      )}
      style={{ clipPath: "polygon(2% 0, 100% 1%, 98% 100%, 0 99%)" }}
    >
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_40%)]" />
      <div className="relative flex h-full flex-col justify-between gap-8">
        <span className="w-fit bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-gray-900">
          {tag}
        </span>
        <div className="max-w-md">
          <h3 className="mb-3 text-2xl font-bold md:text-3xl">{title}</h3>
          <p className="text-sm leading-relaxed text-white/90 md:text-base">
            {caption}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

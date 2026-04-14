import { motion } from "motion/react";

type ThemeCardProps = {
  title: string;
  description: string;
  iconSrc: string;
  iconBackground: string;
  iconClipPath: string;
  cardClipPath: string;
  rotate: number;
  iconRotateClass: string;
  delay: number;
  className?: string;
};

export function ThemeCard({
  title,
  description,
  iconSrc,
  iconBackground,
  iconClipPath,
  cardClipPath,
  rotate,
  iconRotateClass,
  delay,
  className,
}: ThemeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ rotate: 0, scale: 1.05 }}
      className={`relative space-y-3 bg-white p-6 text-center shadow-xl md:space-y-4 md:p-8 ${className ?? ""}`}
      style={{ clipPath: cardClipPath }}
    >
      <div
        className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center md:mb-4 md:h-24 md:w-24 ${iconRotateClass}`}
        style={{ backgroundColor: iconBackground, clipPath: iconClipPath }}
      >
        <img src={iconSrc} alt="" className="h-12 w-12 md:h-14 md:w-14" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 md:text-2xl">{title}</h3>
      <p className="px-2 text-sm text-gray-700 md:text-base">{description}</p>
    </motion.div>
  );
}

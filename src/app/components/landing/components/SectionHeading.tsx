import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "../../ui/utils";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12 text-center md:mb-16", className)}
    >
      <h2
        className={cn(
          "font-rejsfest text-3xl tracking-[0.04em] uppercase text-gray-900 md:text-4xl",
          description && "mb-4 md:mb-6",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mx-auto max-w-3xl px-4 text-base text-gray-700 md:text-xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

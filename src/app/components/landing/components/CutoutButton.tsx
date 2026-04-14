import { motion } from "motion/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../ui/utils";

type CutoutButtonVariant = "blue" | "yellow";

type CutoutButtonProps = ComponentPropsWithoutRef<typeof motion.button> & {
  children: ReactNode;
  variant?: CutoutButtonVariant;
  colorClassName?: string;
};

const variantClasses: Record<CutoutButtonVariant, string> = {
  blue: "bg-[#325DA8] text-white hover:bg-[#2A4D8F] shadow-lg",
  yellow: "bg-[#F9E926] text-gray-900 hover:bg-[#E5D520] shadow-xl",
};

export function CutoutButton({
  children,
  className,
  variant = "yellow",
  colorClassName,
  whileHover,
  whileTap,
  style,
  ...props
}: CutoutButtonProps) {
  return (
    <motion.button
      className={cn(
        "px-8 py-3 font-bold transition-colors",
        colorClassName ?? variantClasses[variant],
        className,
      )}
      style={{ clipPath: "polygon(2% 0, 100% 0, 98% 100%, 0 100%)", ...style }}
      whileHover={whileHover ?? { scale: 1.08, rotate: -1 }}
      whileTap={whileTap ?? { scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

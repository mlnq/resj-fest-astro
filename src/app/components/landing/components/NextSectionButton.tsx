import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

type NextSectionButtonProps = {
  hidden?: boolean;
  onClick: () => void;
};

export function NextSectionButton({
  hidden = false,
  onClick,
}: NextSectionButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label="Przewiń do następnej sekcji"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={hidden ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-8 left-1/2 z-50 hidden h-16 w-16 -translate-x-1/2 items-center justify-center bg-[#325DA8] text-white shadow-[0_12px_32px_rgba(16,36,79,0.28)] md:flex"
      style={{
        clipPath: "polygon(14% 0, 100% 10%, 86% 100%, 0 90%)",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <motion.span
        animate={hidden ? { y: 0 } : { y: [0, 4, 0] }}
        transition={{
          duration: 1.35,
          repeat: hidden ? 0 : Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <ArrowDown className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.8} />
      </motion.span>
    </motion.button>
  );
}

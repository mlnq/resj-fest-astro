import { motion } from "motion/react";

type ScheduleItem_oldProps = {
  time: string;
  title: string;
  description: string;
  color: string;
  delay: number;
};

export function ScheduleItem_old({
  time,
  title,
  description,
  color,
  delay,
}: ScheduleItem_oldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col items-start gap-4 overflow-hidden bg-[#FFF9E6] p-4 shadow-md sm:flex-row md:gap-6 md:p-6"
      style={{ clipPath: "polygon(0 2%, 100% 0, 100% 98%, 0 100%)" }}
    >
      <div
        className="absolute top-0 right-0 h-full w-2"
        style={{ backgroundColor: color }}
      />
      <div className="w-16 flex-shrink-0 text-xl font-bold text-gray-900 md:w-20 md:text-2xl">
        {time}
      </div>
      <div className="flex-1">
        <h3 className="mb-1 text-lg font-bold text-gray-900 md:text-xl">
          {title}
        </h3>
        <p className="text-sm text-gray-700 md:text-base">{description}</p>
      </div>
    </motion.div>
  );
}

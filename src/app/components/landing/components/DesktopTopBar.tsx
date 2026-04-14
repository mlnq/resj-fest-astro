import { motion, type MotionValue } from "motion/react";
import type { RefObject } from "react";

const desktopNavItems = [
  { id: "start", label: "Start" },
  { id: "historia", label: "Historia" },
  { id: "plan", label: "Plan" },
  { id: "miejsce", label: "Miejsce" },
  { id: "zapisy", label: "Zapisy" },
] as const;

type DesktopTopBarProps = {
  activeSectionId?: string;
  logoSrc: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  heroRef: RefObject<HTMLElement | null>;
  isSolid: boolean;
};

export function DesktopTopBar({
  activeSectionId,
  logoSrc,
  opacity,
  y,
  heroRef,
  isSolid,
}: DesktopTopBarProps) {
  const scrollToElement = (element: HTMLElement, offset = 72) => {
    const targetTop = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  };

  const handleNavigate = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    scrollToElement(element);
  };

  const handleNavigateStart = () => {
    if (!heroRef.current) return;
    scrollToElement(heroRef.current, 0);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden md:block">
      <motion.div
        className="pointer-events-auto flex w-screen items-center justify-between px-6 py-5 lg:px-8"
        style={{
          opacity: isSolid ? opacity : 1,
          y: isSolid ? y : 0,
        }}
      >
        <button
          type="button"
          onClick={handleNavigateStart}
          className={`text-left transition-opacity duration-300 ${isSolid ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={logoSrc}
            alt="Rejs Fest 26"
            className="w-full max-w-[72px]"
          />
        </button>

        <nav
          className={`flex items-center gap-10 transition-colors duration-300 ${
            isSolid ? "text-black" : "text-white"
          }`}
        >
          {desktopNavItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className="relative pb-2 text-xl font-black uppercase tracking-[-0.03em] transition-opacity hover:opacity-65"
            >
              {item.label}
              <span
                className={`absolute inset-x-0 -bottom-0.5 h-[3px] bg-[#325DA8] transition-opacity duration-200 ${
                  activeSectionId === item.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          ))}
        </nav>
        <motion.div
          className="absolute inset-0 -z-10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          style={{ opacity, y }}
        />
      </motion.div>
    </div>
  );
}

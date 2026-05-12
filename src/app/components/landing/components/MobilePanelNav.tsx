import { Anchor, House, ScrollText } from "lucide-react";
import { useState } from "react";
import { cn } from "../../ui/utils";

const navItems = [
  { id: "start", label: "Start", icon: House },
  { id: "wydarzenie", label: "Vibe", icon: ScrollText },
  { id: "zapisy", label: "Pokład", icon: Anchor },
] as const;

export function MobilePanelNav() {
  const [activeId, setActiveId] = useState<(typeof navItems)[number]["id"]>("start");

  const scrollToElement = (element: HTMLElement, offset = 20) => {
    const targetTop = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  };

  const handleNavigate = (targetId: (typeof navItems)[number]["id"]) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    setActiveId(targetId);
    scrollToElement(element);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-40 px-4 md:hidden">
      <div
        className="pointer-events-auto grid grid-cols-3 bg-[#433052]/96 px-2 py-2 shadow-[0_16px_34px_rgba(38,27,54,0.24)] backdrop-blur-sm"
        style={{ clipPath: "polygon(2% 0, 100% 0, 98% 100%, 0 100%)" }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-1 py-1 text-white transition-colors",
                activeId === item.id && "bg-white/12",
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
              <span className="font-sans text-[11px] leading-none font-medium tracking-[0.01em]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

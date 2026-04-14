import { CalendarDays, House, MapPinned, PenSquare, ScrollText } from "lucide-react";
import { useState } from "react";
import { cn } from "../../ui/utils";

const navItems = [
  { id: "start", label: "Start", icon: House },
  { id: "historia", label: "Historia", icon: ScrollText },
  { id: "plan", label: "Plan", icon: CalendarDays },
  { id: "miejsce", label: "Miejsce", icon: MapPinned },
  { id: "zapisy", label: "Zapisy", icon: PenSquare },
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
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
      <div
        className="pointer-events-auto grid grid-cols-5 bg-[#325DA8] px-3 py-4 shadow-lg"
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
                "flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-white transition-colors",
                activeId === item.id && "bg-white/12",
              )}
            >
              <Icon className="h-6 w-6" strokeWidth={2.4} />
              <span className="text-[0.72rem] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

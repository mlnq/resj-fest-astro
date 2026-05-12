import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "../../ui/utils";

type ParishComboboxProps = {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  emptyMessage?: string;
  specialOptionLabel?: string;
  invalid?: boolean;
};

const normalizeText = (value: string) =>
  value
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function ParishCombobox({
  options,
  value,
  onChange,
  placeholder,
  emptyMessage = "Brak wyników",
  specialOptionLabel,
  invalid = false,
}: ParishComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const filteredOptions = options.filter((option) =>
    normalizeText(option).includes(normalizeText(query)),
  );
  const actionOptions = specialOptionLabel ? [specialOptionLabel] : [];
  const allVisibleOptions = [...filteredOptions, ...actionOptions];

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const selectedIndex = allVisibleOptions.findIndex((option) => option === value);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [allVisibleOptions, isOpen, value]);

  useEffect(() => {
    if (!isOpen) return;

    const input = searchInputRef.current;
    if (!input) return;

    requestAnimationFrame(() => {
      input.focus({ preventScroll: true });
    });
  }, [isOpen]);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
    setQuery("");
  };

  const handleToggle = () => {
    setIsOpen((current) => !current);
    if (isOpen) {
      setQuery("");
    }
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      setQuery("");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((current) =>
        Math.min(current + 1, Math.max(allVisibleOptions.length - 1, 0)),
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter" && allVisibleOptions[highlightedIndex]) {
      event.preventDefault();
      handleSelect(allVisibleOptions[highlightedIndex]);
    }
  };

  return (
    <div ref={rootRef} className="relative z-[9999]">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-invalid={invalid}
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "flex w-full z-50 items-center justify-between rounded-[1.75rem] border-2 bg-white px-6 py-4 text-left transition-colors",
          invalid && !isOpen && "border-[#B4495D] bg-[#FFF8FA]",
          isOpen
            ? "border-[#503967] shadow-[0_16px_34px_rgba(80,57,103,0.12)]"
            : "border-[#6A5289] hover:border-[#503967]",
        )}
      >
        <span
          className={cn(
            "pr-4 font-sans text-[1.05rem] leading-[1.25] md:text-[1.1rem]",
            value ? "text-[#21314E]" : "text-[#32415E]",
          )}
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={cn("h-6 w-6 shrink-0 text-[#503967] transition-transform", isOpen && "rotate-180")}
          strokeWidth={2.1}
        />
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 right-0 top-[calc(100%+0.65rem)] z-[9999] overflow-hidden rounded-[1.5rem] border border-[#D8D0DF] bg-white shadow-[0_24px_50px_rgba(38,27,54,0.18)]"
        >
          <div className="border-b border-[#EEE8F4] px-4 py-3">
            <label className="sr-only" htmlFor={`${listboxId}-search`}>
              Szukaj parafii
            </label>
            <div className="flex items-center gap-3 rounded-[1.1rem] border border-[#DDD7E5] bg-[#FBFAFE] px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-[#7C6E92]" strokeWidth={2.2} />
              <input
                ref={searchInputRef}
                id={`${listboxId}-search`}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Szukaj parafii"
                className="w-full bg-transparent font-sans text-[0.95rem] text-[#21314E] placeholder:text-[#8A7F99] focus:outline-none"
              />
            </div>
          </div>

          <div
            id={listboxId}
            role="listbox"
            aria-activedescendant={allVisibleOptions[highlightedIndex] ? `${listboxId}-${highlightedIndex}` : undefined}
            className="max-h-72 overflow-y-auto p-2"
          >
            {filteredOptions.map((option, index) => {
              const isSelected = value === option;
              const isHighlighted = highlightedIndex === index;

              return (
                <button
                  key={option}
                  id={`${listboxId}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "flex w-full items-start justify-between gap-3 rounded-[1rem] px-4 py-3 text-left font-sans text-[0.95rem] leading-6 transition-colors",
                    isHighlighted ? "bg-[#F4F0FA]" : "bg-transparent",
                    isSelected ? "text-[#21314E]" : "text-[#32415E]",
                  )}
                >
                  <span>{option}</span>
                  {isSelected ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#503967]" strokeWidth={2.6} />
                  ) : null}
                </button>
              );
            })}

            {specialOptionLabel ? (
              <div className="mt-1 border-t border-[#EEE8F4] pt-2">
                <button
                  id={`${listboxId}-${filteredOptions.length}`}
                  type="button"
                  role="option"
                  aria-selected={value === specialOptionLabel}
                  onMouseEnter={() => setHighlightedIndex(filteredOptions.length)}
                  onClick={() => handleSelect(specialOptionLabel)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[1rem] px-4 py-3 text-left font-sans text-[0.95rem] transition-colors",
                    highlightedIndex === filteredOptions.length ? "bg-[#F4F0FA]" : "bg-transparent",
                    value === specialOptionLabel ? "text-[#21314E]" : "text-[#32415E]",
                  )}
                >
                  <span>{specialOptionLabel}</span>
                  {value === specialOptionLabel ? (
                    <Check className="h-4 w-4 shrink-0 text-[#503967]" strokeWidth={2.6} />
                  ) : null}
                </button>
              </div>
            ) : null}

            {filteredOptions.length === 0 ? (
              <p className="px-4 py-3 font-sans text-[0.92rem] text-[#7A7483]">{emptyMessage}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

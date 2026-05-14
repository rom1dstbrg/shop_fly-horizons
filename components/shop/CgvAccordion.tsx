"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Section {
  title: string;
  content: string;
}

export function CgvAccordion({ sections }: { sections: Section[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {sections.map((section, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-[0_2px_14px_rgba(17,51,86,.07)]"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-foreground">
                {section.title}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 border-t border-border pt-4">
                  {section.content.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  icon: React.ReactNode;
  step?: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<HTMLUListElement, ExpandingCardsProps>(
  ({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const onResize = () => setIsDesktop(window.innerWidth >= 768);
      onResize();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    const gridStyle = React.useMemo(() => {
      const track = items
        .map((_, i) => (i === activeIndex ? "6fr" : "1fr"))
        .join(" ");
      return isDesktop
        ? { gridTemplateColumns: track, gridTemplateRows: "520px" }
        : { gridTemplateRows: track, gridTemplateColumns: "1fr" };
    }, [activeIndex, items, isDesktop]);

    return (
      <ul
        ref={ref}
        className={cn(
          "grid w-full gap-3 transition-[grid-template-columns,grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          className,
        )}
        style={gridStyle}
        {...props}
      >
        {items.map((item, index) => {
          const active = activeIndex === index;
          return (
            <li
              key={item.id}
              tabIndex={0}
              data-active={active}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-surface-alt cursor-pointer",
                "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "min-h-[88px] md:min-h-0",
                active ? "shadow-[0_0_60px_-20px_rgba(200,169,110,0.45)] border-accent/40" : "hover:border-accent/30",
              )}
            >
              {/* Gold gradient backdrop on active */}
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  active ? "opacity-100" : "opacity-0",
                )}
                style={{
                  background:
                    "radial-gradient(ellipse 90% 70% at 30% 0%, rgba(200,169,110,0.18), transparent 60%), linear-gradient(135deg, #0E1318 0%, #080B0F 100%)",
                }}
              />
              {/* Giant ghost icon */}
              <div
                aria-hidden
                className={cn(
                  "absolute right-[-30px] bottom-[-30px] text-accent/10 transition-all duration-700",
                  active ? "scale-100 opacity-100" : "scale-75 opacity-40",
                )}
              >
                <div className="[&_svg]:w-[260px] [&_svg]:h-[260px]">{item.icon}</div>
              </div>

              {/* Collapsed label (vertical on desktop) */}
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center px-4 transition-opacity duration-300",
                  active ? "opacity-0 pointer-events-none" : "opacity-100",
                )}
              >
                <div className="flex md:flex-col items-center gap-3 md:gap-4">
                  <div className="text-accent [&_svg]:w-6 [&_svg]:h-6">{item.icon}</div>
                  <span className="font-sans text-sm text-foreground md:[writing-mode:vertical-rl] md:rotate-180 tracking-wider uppercase">
                    {item.title}
                  </span>
                </div>
              </div>

              {/* Expanded content */}
              <div
                className={cn(
                  "relative h-full flex flex-col justify-end p-8 md:p-10 transition-all duration-700",
                  active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
                )}
              >
                {item.step && (
                  <div className="text-xs tracking-[0.22em] uppercase text-accent font-medium mb-4">
                    {item.step}
                  </div>
                )}
                <div className="text-accent mb-4 [&_svg]:w-8 [&_svg]:h-8">{item.icon}</div>
                <h3 className="font-serif text-3xl md:text-4xl text-foreground leading-tight max-w-md">
                  {item.title}
                </h3>
                <p className="mt-4 text-subtext leading-relaxed max-w-md">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  },
);
ExpandingCards.displayName = "ExpandingCards";

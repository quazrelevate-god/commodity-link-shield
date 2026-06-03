import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface RadialGlowBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  /** Glow color (any valid CSS color). Defaults to a warm gold tuned to the brand. */
  glowColor?: string;
  /** 0–1 intensity of the glow. */
  intensity?: number;
  /** Where the glow originates. */
  position?: "top" | "center" | "bottom";
}

/**
 * Dark page background with a soft radial glow.
 * Render as a fixed/absolute layer behind your content.
 */
export const RadialGlowBackground = ({
  glowColor = "rgba(200, 169, 110, 0.35)",
  intensity = 1,
  position = "center",
  className,
  style,
  ...props
}: RadialGlowBackgroundProps) => {
  const origin =
    position === "top" ? "50% 0%" : position === "bottom" ? "50% 100%" : "50% 50%";

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 bg-background", className)}
      style={{
        backgroundImage: `radial-gradient(ellipse 80% 60% at ${origin}, ${glowColor}, transparent 70%)`,
        opacity: intensity,
        ...style,
      }}
      {...props}
    />
  );
};

export default RadialGlowBackground;

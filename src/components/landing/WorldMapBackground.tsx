import { LAND_DOTS, HUBS, MAP_WIDTH, MAP_HEIGHT, DOT_RADIUS } from "./world-map-dots";

/**
 * Dotted world-map hero background.
 * Two stacked SVG layers (dim base + bright spotlight) sit underneath the same
 * radial cursor mask the previous grid used, so the existing micro-interaction
 * is preserved — but now only land dots light up.
 */
export function WorldMapBackground() {
  const viewBox = `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`;

  return (
    <>
      {/* Base layer: dim land dots, gently faded from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 0%, rgba(0,0,0,0.6) 55%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 35%, black 0%, rgba(0,0,0,0.6) 55%, transparent 95%)",
        }}
      >
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden="true"
        >
          <g fill="rgba(200,169,110,0.22)">
            {LAND_DOTS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={DOT_RADIUS} />
            ))}
          </g>
        </svg>
      </div>

      {/* Pulsing trade-hub dots */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden="true"
        >
          {HUBS.map((h) => (
            <g key={h.name}>
              {/* outer pulsing ring */}
              <circle
                cx={h.x}
                cy={h.y}
                r={2.5}
                fill="none"
                stroke="rgba(226,201,126,0.55)"
                strokeWidth={0.6}
              >
                <animate
                  attributeName="r"
                  values="2.5;8;2.5"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0;0.7"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* solid core */}
              <circle cx={h.x} cy={h.y} r={1.8} fill="rgba(232,210,140,0.95)" />
            </g>
          ))}
        </svg>
      </div>

      {/* Cursor spotlight: same dot map, brighter, masked to a circle around the cursor */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100"
        style={{
          maskImage:
            "radial-gradient(280px circle at var(--mx) var(--my), black 0%, rgba(0,0,0,0.55) 45%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(280px circle at var(--mx) var(--my), black 0%, rgba(0,0,0,0.55) 45%, transparent 78%)",
        }}
      >
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden="true"
        >
          <g fill="rgba(232,210,140,0.95)">
            {LAND_DOTS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={DOT_RADIUS + 0.2} />
            ))}
          </g>
        </svg>
      </div>
    </>
  );
}

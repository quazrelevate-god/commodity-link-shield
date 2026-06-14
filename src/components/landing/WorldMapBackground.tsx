import { LAND_DOTS, SEA_DOTS, MAP_WIDTH, MAP_HEIGHT, DOT_RADIUS } from "./world-map-dots";

/**
 * Dotted world-map hero background.
 * Sea dots: small, faint (secondary). Land dots: full size, gold (primary).
 * Cursor spotlight brightens land dots near the mouse.
 */
export function WorldMapBackground() {
  const viewBox = `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`;

  return (
    <>
      {/* Base layer: sea (small/faint) + land (full/gold) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 38%, black 0%, rgba(0,0,0,0.6) 60%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 38%, black 0%, rgba(0,0,0,0.6) 60%, transparent 95%)",
        }}
      >
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Sea — secondary hierarchy */}
          <g fill="rgba(200,169,110,0.09)">
            {SEA_DOTS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={DOT_RADIUS * 0.5} />
            ))}
          </g>
          {/* Land — primary hierarchy */}
          <g fill="rgba(200,169,110,0.32)">
            {LAND_DOTS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={DOT_RADIUS} />
            ))}
          </g>
        </svg>
      </div>

      {/* Cursor spotlight: brighter land dots inside a circle around the cursor */}
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
          <g fill="rgba(226,201,126,0.5)">
            {SEA_DOTS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={DOT_RADIUS * 0.55} />
            ))}
          </g>
        </svg>
      </div>
    </>
  );
}

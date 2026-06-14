import { geoRobinson } from "d3-geo-projection";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import fs from "node:fs";
import path from "node:path";

const topoPath = path.resolve("node_modules/world-atlas/land-110m.json");
const topo = JSON.parse(fs.readFileSync(topoPath, "utf8"));
const land = feature(topo, topo.objects.land);

const W = 1000;
const H = 500;
const projection = geoRobinson().fitSize([W, H], { type: "Sphere" });

const STEP = 10;
const R = 1.4;

const land_dots = [];
const sea_dots = [];
for (let y = STEP / 2; y < H; y += STEP) {
  for (let x = STEP / 2; x < W; x += STEP) {
    const coords = projection.invert([x, y]);
    if (!coords) continue;
    const [lon, lat] = coords;
    if (lat > 84 || lat < -60) continue;
    if (Math.abs(lon) > 180 || Math.abs(lat) > 90) continue;
    const point = [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
    if (geoContains(land, [lon, lat])) land_dots.push(point);
    else sea_dots.push(point);
  }
}

const out = `// Auto-generated — do not edit by hand.
export const MAP_WIDTH = ${W};
export const MAP_HEIGHT = ${H};
export const DOT_RADIUS = ${R};
export const LAND_DOTS: ReadonlyArray<readonly [number, number]> = ${JSON.stringify(land_dots)};
export const SEA_DOTS: ReadonlyArray<readonly [number, number]> = ${JSON.stringify(sea_dots)};
`;

fs.writeFileSync("src/components/landing/world-map-dots.ts", out);
console.log(`Wrote ${land_dots.length} land, ${sea_dots.length} sea dots.`);

import { Polygon } from '@/core/types/geo-json';

export function calculatePolygonArea(polygon: Polygon): number {
  const outerRing = polygon[0];
  const n = outerRing.length;

  if (n < 3) {
    // A polygon must have at least 3 vertices
    throw new Error('Polygon has fewer than 3 vertices.');
  }

  let area = 0;
  for (let i = 0; i < n; i++) {
    const xi = outerRing[i][0];
    const yi = outerRing[i][1];
    const xi1 = outerRing[(i + 1) % n][0];
    const yi1 = outerRing[(i + 1) % n][1];
    area += xi * yi1 - xi1 * yi;
  }

  return Math.abs(area) / 2;
}

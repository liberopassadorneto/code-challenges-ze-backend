import { Polygon, Point } from '@/core/types/geo-json';

export function calculatePolygonCentroid(polygon: Polygon): Point {
  const n = polygon[0].length; // Assuming the first linear ring defines the outer boundary
  let A = 0;
  let centroidX = 0;
  let centroidY = 0;

  for (let i = 0; i < n - 1; i++) {
    const xi = polygon[0][i][0];
    const yi = polygon[0][i][1];
    const xi1 = polygon[0][i + 1][0];
    const yi1 = polygon[0][i + 1][1];

    const ai = xi * yi1 - xi1 * yi;
    A += ai;
    centroidX += (xi + xi1) * ai;
    centroidY += (yi + yi1) * ai;
  }

  A /= 2;
  if (A === 0) {
    // The polygon is degenerate (has no area)
    throw new Error('The polygon has no area.');
  }

  centroidX /= 6 * A;
  centroidY /= 6 * A;

  return [centroidX, centroidY];
}

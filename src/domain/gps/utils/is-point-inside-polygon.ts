import { Point, Polygon } from '@/core/types/geo-json';

/*
 ray casting method (also known as the ray crossing or even-odd method).
*/

// Check if a point is inside a polygon
export function isPointInsidePolygon(point: Point, polygon: Polygon): boolean {
  let isInside = false;
  for (let i = 0; i < polygon.length; i++) {
    // Handle each ring of the polygon
    const ring = polygon[i];
    let j = ring.length - 1;
    for (let i = 0; i < ring.length; i++) {
      const xi = ring[i][0],
        yi = ring[i][1];
      const xj = ring[j][0],
        yj = ring[j][1];

      const intersect =
        yi > point[1] !== yj > point[1] &&
        point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi;
      if (intersect) {
        isInside = !isInside;
      }
      j = i;
    }
  }
  return isInside;
}

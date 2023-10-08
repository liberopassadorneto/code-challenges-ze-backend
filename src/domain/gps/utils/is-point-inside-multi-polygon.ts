import { Point, MultiPolygon } from '@/core/types/geo-json';
import { isPointInsidePolygon } from './is-point-inside-polygon';

// Check if a point is inside a MultiPolygon
export function isPointInMultiPolygon(
  point: Point,
  multiPolygon: MultiPolygon,
): boolean {
  for (const polygon of multiPolygon) {
    if (isPointInsidePolygon(point, polygon)) {
      return true;
    }
  }
  return false;
}

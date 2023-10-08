import { MultiPolygon, Point } from '@/core/types/geo-json';
import { calculatePolygonArea } from './calculate-polygon-area';
import { calculatePolygonCentroid } from './calculate-polygon-centroid';

export function calculateMultiPolygonCentroid(
  multiPolygon: MultiPolygon,
): Point {
  let totalArea = 0;
  let totalCentroidX = 0;
  let totalCentroidY = 0;

  for (const polygon of multiPolygon) {
    const [centroidX, centroidY] = calculatePolygonCentroid(polygon);
    const area = calculatePolygonArea(polygon);
    totalArea += area;
    totalCentroidX += centroidX * area;
    totalCentroidY += centroidY * area;
  }

  if (totalArea === 0) {
    throw new Error('The MultiPolygon has no area.');
  }

  const centroidX = totalCentroidX / totalArea;
  const centroidY = totalCentroidY / totalArea;

  return [centroidX, centroidY];
}

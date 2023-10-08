import { Point } from '@/core/types/geo-json';

export function calculateEuclideanDistance(
  point1: Point,
  point2: Point,
): number {
  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];
  return Math.sqrt(dx * dx + dy * dy);
}

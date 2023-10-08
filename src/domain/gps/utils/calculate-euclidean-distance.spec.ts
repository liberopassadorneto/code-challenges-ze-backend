import { Point } from '@/core/types/geo-json';
import { calculateEuclideanDistance } from './calculate-euclidean-distance';

describe('CalculateEuclideanDistance', () => {
  it('should return the euclidean distance between two points', () => {
    const point1: Point = [1, 1];
    const point2: Point = [4, 5];

    // distance = sqrt((x2 - x1)^2 + (y2 - y1)^2)
    // distance = sqrt((4 - 1)^2 + (5 - 1)^2)
    // distance = sqrt(9 + 16)
    // distance = sqrt(25)
    // distance = 5

    const distance = calculateEuclideanDistance(point1, point2);
    expect(distance).toBe(5);
  });
});

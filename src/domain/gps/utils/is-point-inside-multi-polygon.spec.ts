import { Point, MultiPolygon } from '@/core/types/geo-json';
import { isPointInMultiPolygon } from './is-point-inside-multi-polygon';

describe('IsPointInsideMultiPolygon', () => {
  const multiPolygon: MultiPolygon = [
    [
      [
        [30, 20],
        [45, 40],
        [10, 40],
        [30, 20],
      ],
    ],
    [
      [
        [15, 5],
        [40, 10],
        [10, 20],
        [5, 10],
        [15, 5],
      ],
    ],
  ];
  it('should return true if a point is inside', () => {
    const pointInside: Point = [20, 15];

    const sut = isPointInMultiPolygon(pointInside, multiPolygon);
    expect(sut).toBe(true);
  });

  it('should return false if a point is outside', () => {
    const pointOutside: Point = [50, 50];

    const sut = isPointInMultiPolygon(pointOutside, multiPolygon);
    expect(sut).toBe(false);
  });
});

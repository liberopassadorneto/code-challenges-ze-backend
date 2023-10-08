import { Point, Polygon } from '@/core/types/geo-json';
import { isPointInsidePolygon } from './is-point-inside-polygon';

describe('IsPointInsidePolygon', () => {
  const polygon: Polygon = [
    [
      [-46.57421, -21.785741],
      [-46.57298, -21.787075],
      [-46.57157, -21.785741],
      [-46.57298, -21.784407],
    ],
  ];

  it('should return true if a point is inside', () => {
    const pointInside: Point = [-46.57319, -21.785741];

    const sut = isPointInsidePolygon(pointInside, polygon);
    expect(sut).toBe(true);
  });

  it('should return true if a point is in the vertex', () => {
    const pointInVertex: Point = [-46.57421, -21.785741];

    const sut = isPointInsidePolygon(pointInVertex, polygon);
    expect(sut).toBe(true);
  });

  it('should return true if a point is in the edge', () => {
    const pointInEdge: Point = [-46.573595, -21.786408];

    const sut = isPointInsidePolygon(pointInEdge, polygon);
    expect(sut).toBe(true);
  });

  it('should return false if a point is outside', () => {
    const pointOutside: Point = [-46.57431, -21.785841];

    const sut = isPointInsidePolygon(pointOutside, polygon);
    expect(sut).toBe(false);
  });
});

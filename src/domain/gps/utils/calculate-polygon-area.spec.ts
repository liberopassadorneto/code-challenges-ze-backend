import { Polygon } from '@/core/types/geo-json';
import { calculatePolygonArea } from './calculate-polygon-area';

describe('CalculatePolygonArea', () => {
  it('should calculate the area of a polygon', () => {
    const polygon: Polygon = [
      [
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4],
        [0, 0],
      ],
    ];

    // area of a square with side 4
    // area = side * side
    // area = 4 * 4
    // area = 16

    const area = 16;

    const sut = calculatePolygonArea(polygon);

    expect(sut).toBe(area);
  });
});

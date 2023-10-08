import { Polygon } from '@/core/types/geo-json';
import { calculatePolygonCentroid } from './calculate-polygon-centroid';

describe('CalculatePolygonCentroid', () => {
  it('should return the centroid of a polygon', () => {
    const polygon: Polygon = [
      [
        [0, 0],
        [4, 0],
        [4, 4],
        [0, 4],
        [0, 0],
      ],
    ];

    const centroid = calculatePolygonCentroid(polygon);
    expect(centroid).toEqual([2, 2]);
  });
});

import { CoverageArea } from './coverage-area';
import { GeoJson } from '@/core/types/geo-json';

test('it should be able to create a new coverage area', () => {
  const coverageArea = CoverageArea.create({
    coordinates: [[[[0, 0]]]],
  });

  expect(coverageArea.getType()).toBe(GeoJson.MultiPolygon);
  expect(coverageArea.getCoordinates()).toEqual([[[[0, 0]]]]);
});

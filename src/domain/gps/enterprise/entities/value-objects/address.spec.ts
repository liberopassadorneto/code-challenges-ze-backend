import { GeoJson } from '@/core/types/geo-json';
import { Address } from './address';

test('it should be able to create a new address', () => {
  const address = Address.create({
    coordinates: [0, 0],
  });

  expect(address.getType()).toBe(GeoJson.Point);
  expect(address.getCoordinates()).toEqual([0, 0]);
});

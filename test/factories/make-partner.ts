import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MultiPolygon, Point, Polygon } from '@/core/types/geo-json';
import {
  Partner,
  PartnerProps,
} from '@/domain/gps/enterprise/entities/partner';
import { Address } from '@/domain/gps/enterprise/entities/value-objects/address';
import { CoverageArea } from '@/domain/gps/enterprise/entities/value-objects/coverage-area';
import { faker } from '@faker-js/faker';

function createPoint(): Point {
  return [faker.location.longitude(), faker.location.latitude()];
}

export function createPolygon(vertices: number = 3): Polygon {
  const polygon: Polygon = [[]];

  for (let i = 0; i < vertices; i++) {
    polygon[0].push(createPoint());
  }

  // Ensure the first and last coordinate are the same to close the polygon
  polygon[0].push(polygon[0][0]);

  return polygon;
}

export function createMultiPolygon(
  polygons: number = 2,
  vertices: number = 3,
): MultiPolygon {
  const multiPolygon: MultiPolygon = [];

  for (let i = 0; i < polygons; i++) {
    multiPolygon.push(createPolygon(vertices));
  }

  return multiPolygon;
}

export function makePartner(
  override: Partial<PartnerProps> = {},
  id?: UniqueEntityID,
): Partner {
  return Partner.create(
    {
      tradingName: faker.company.name(),
      ownerName: faker.person.firstName(),
      document: faker.lorem.slug(1),
      coverageArea: CoverageArea.create({
        coordinates: createMultiPolygon(),
      }),
      address: Address.create({ coordinates: createPoint() }),
      ...override,
    },
    id,
  );
}

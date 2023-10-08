export enum GeoJson {
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
}

export type Point = [number, number];

export type Polygon = number[][][];

export type MultiPolygon = number[][][][];

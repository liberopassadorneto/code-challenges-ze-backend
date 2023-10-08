import { GeoJson, Point } from '@/core/types/geo-json';

interface AddressProps {
  coordinates: Point;
}

export class Address {
  type: GeoJson.Point;
  coordinates: Point;

  private constructor(props: AddressProps, type: GeoJson.Point) {
    this.coordinates = props.coordinates;
    this.type = type;
  }

  static create(
    props: AddressProps,
    type: GeoJson.Point = GeoJson.Point,
  ): Address {
    return new Address(props, type);
  }

  getType(): GeoJson {
    return this.type;
  }

  getCoordinates(): Point {
    return this.coordinates;
  }
}

import { GeoJson, MultiPolygon } from '@/core/types/geo-json';

export interface CoverageAreaProps {
  coordinates: MultiPolygon;
}

export class CoverageArea {
  type: GeoJson.MultiPolygon;
  coordinates: MultiPolygon;

  private constructor(props: CoverageAreaProps, type: GeoJson.MultiPolygon) {
    this.coordinates = props.coordinates;
    this.type = type;
  }

  static create(
    props: CoverageAreaProps,
    type: GeoJson.MultiPolygon = GeoJson.MultiPolygon,
  ): CoverageArea {
    return new CoverageArea(props, type);
  }

  getType(): GeoJson {
    return this.type;
  }

  getCoordinates(): MultiPolygon {
    return this.coordinates;
  }
}

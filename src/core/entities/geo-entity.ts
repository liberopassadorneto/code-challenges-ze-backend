import { GeoJson } from '../types/geo-json';

export interface GeoProps {
  type: GeoJson;
  coordinates: any;
}

export abstract class GeoEntity {
  protected props: GeoProps;

  protected constructor(props: GeoProps) {
    this.props = props;
  }

  get type(): GeoJson {
    return this.props.type;
  }

  abstract get coordinates(): any;
}

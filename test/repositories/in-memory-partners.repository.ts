import { Point } from '@/core/types/geo-json';
import {
  FindManyByLocationInput,
  PartnersRepository,
} from '@/domain/gps/application/repositories/partners.repository';
import { Partner } from '@/domain/gps/enterprise/entities/partner';
import { isPointInMultiPolygon } from '@/domain/gps/utils/is-point-inside-multi-polygon';

export class InMemoryPartnersRepository implements PartnersRepository {
  public items: Partner[] = [];

  async create(partner: Partner): Promise<void> {
    this.items.push(partner);
  }

  async findById(partnerId: string): Promise<Partner | null> {
    const partner = this.items.find((item) => item.id.toString() === partnerId);

    if (!partner) {
      return null;
    }

    return partner;
  }

  async findByDocument(document: string): Promise<Partner | null> {
    const partner = this.items.find((item) => item.document === document);

    if (!partner) {
      return null;
    }

    return partner;
  }

  async findManyByLocation({
    long,
    lat,
  }: FindManyByLocationInput): Promise<Partner[]> {
    return this.items.filter((partner) => {
      const polygon = partner.coverageArea.getCoordinates();
      const point: Point = [long, lat];

      return isPointInMultiPolygon(point, polygon);
    });
  }
}

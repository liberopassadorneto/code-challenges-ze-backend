import { Partner } from '../../enterprise/entities/partner';

export interface FindManyByLocationInput {
  long: number;
  lat: number;
}

export abstract class PartnersRepository {
  abstract create(partner: Partner): Promise<void>;
  abstract findById(partnerId: string): Promise<Partner | null>;
  abstract findByDocument(document: string): Promise<Partner | null>;
  abstract findManyByLocation({
    long,
    lat,
  }: FindManyByLocationInput): Promise<Partner[]>;
}

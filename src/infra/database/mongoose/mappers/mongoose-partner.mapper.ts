import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Partner as PartnerDomain } from '@/domain/gps/enterprise/entities/partner';
import { Address } from '@/domain/gps/enterprise/entities/value-objects/address';
import { CoverageArea } from '@/domain/gps/enterprise/entities/value-objects/coverage-area';
import { MongoosePartner } from '../schema/mongoose-partner';

export class MongoosePartnerMapper {
  static toDomain(raw: MongoosePartner): PartnerDomain {
    const partner: PartnerDomain = PartnerDomain.create(
      {
        tradingName: raw.tradingName,
        ownerName: raw.ownerName,
        document: raw.document,
        coverageArea: CoverageArea.create(raw.coverageArea),
        address: Address.create(raw.address),
      },
      new UniqueEntityID(raw._id.toString()),
    );

    return partner;
  }
}

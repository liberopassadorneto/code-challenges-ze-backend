import {
  FindManyByLocationInput,
  PartnersRepository,
} from '@/domain/gps/application/repositories/partners.repository';
import { Partner } from '@/domain/gps/enterprise/entities/partner';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoosePartnerMapper } from '../mappers/mongoose-partner.mapper';
import { MongoosePartner } from '../schema/mongoose-partner';

@Injectable()
export class MongoosePartnersRepository implements PartnersRepository {
  constructor(
    @InjectModel(MongoosePartner.name)
    private partnerModel: Model<MongoosePartner>,
  ) {}

  async create(partner: Partner): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(partnerId: string): Promise<Partner | null> {
    const partner = await this.partnerModel.findById(partnerId).exec();

    if (!partner) {
      return null;
    }

    return MongoosePartnerMapper.toDomain(partner);
  }

  async findByDocument(document: string): Promise<Partner | null> {
    const partner = await this.partnerModel.findOne({ document }).exec();

    if (!partner) {
      return null;
    }

    return MongoosePartnerMapper.toDomain(partner);
  }

  async findManyByLocation({
    long,
    lat,
  }: FindManyByLocationInput): Promise<Partner[]> {
    const partners = await this.partnerModel
      .find({
        coverageArea: {
          $geoWithin: {
            $geometry: {
              type: 'Point',
              coordinates: [long, lat],
            },
          },
        },
      })
      .exec();

    return partners.map(MongoosePartnerMapper.toDomain);
  }
}

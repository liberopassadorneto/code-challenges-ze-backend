import { MongoosePartner } from '@/infra/database/mongoose/schema/mongoose-partner';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePartnerInput } from '../graphql/dtos/inputs/create-partner.input';
import { PartnerModel } from '../graphql/dtos/models/partner.model';

@Resolver()
export class CreatePartnerResolver {
  constructor(
    @InjectModel(MongoosePartner.name)
    private partnerModel: Model<MongoosePartner>,
  ) {}

  @Mutation(() => PartnerModel)
  async createPartner(@Args('data') data: CreatePartnerInput) {
    const partner = await this.partnerModel.create(data);
    return partner;
  }
}

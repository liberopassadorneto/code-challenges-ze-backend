import { Field, ObjectType } from '@nestjs/graphql';
import { AddressModel } from './address.model';
import { CoverageAreaModel } from './coverage-area.model';

@ObjectType()
export class PartnerModel {
  @Field(() => String)
  tradingName: string;

  @Field(() => String)
  ownerName: string;

  @Field(() => String)
  document: string;

  @Field(() => CoverageAreaModel)
  coverageArea: CoverageAreaModel;

  @Field(() => AddressModel)
  address: AddressModel;
}

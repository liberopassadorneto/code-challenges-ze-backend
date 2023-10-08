import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class Address {
  @Field((type) => [Float])
  coordinates: [number, number];
}

@InputType()
export class CreatePartnerInput {
  @Field()
  tradingName: string;

  @Field()
  ownerName: string;

  @Field()
  document: string;

  @Field(() => Address)
  address: Address;
}

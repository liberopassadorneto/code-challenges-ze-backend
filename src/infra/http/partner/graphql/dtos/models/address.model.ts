import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddressModel {
  @Field(() => String)
  type: string;

  @Field(() => [Number])
  coordinates: [number, number];
}

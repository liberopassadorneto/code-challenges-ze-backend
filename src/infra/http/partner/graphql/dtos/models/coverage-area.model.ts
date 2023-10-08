import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoverageAreaModel {
  @Field(() => String)
  type: string;

  @Field(() => [[[Float]]])
  coordinates: [[[number]]];
}

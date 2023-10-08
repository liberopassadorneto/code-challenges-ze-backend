import {
  MongoosePartner,
  MongoosePartnerSchema,
} from '@/infra/database/mongoose/schema/mongoose-partner';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatePartnerResolver } from './graphql/resolvers/create-partner.resolver';
import { LoadPartnerByIdResolver } from './graphql/resolvers/load-partner-by-id.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoosePartner.name, schema: MongoosePartnerSchema },
    ]),
  ],
  providers: [LoadPartnerByIdResolver, CreatePartnerResolver],
})
export class PartnerModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { PartnerModule } from './http/partner/partner.module';

@Module({
  imports: [DatabaseModule, HttpModule, PartnerModule],
})
export class AppModule {}

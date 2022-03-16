import { Module } from '@nestjs/common';
import { CommissionModule } from './commission/commission.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CommissionModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}

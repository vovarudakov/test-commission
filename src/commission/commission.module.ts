import { Module } from '@nestjs/common';
import { CommissionCalculatorService } from './commission-calculator.service';
import { CommissionController } from './commission.controller';
import { TransactionModule } from '../transaction/transaction.module';
import { HighTurnover } from './rules/high.turnover';
import { Default } from './rules/default';
import { Client42 } from './rules/client42';
import { RequestConverterService } from './transaction/request-converter.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TransactionModule, HttpModule, ConfigModule],
  providers: [
    CommissionCalculatorService,
    RequestConverterService,
    HighTurnover,
    Default,
    Client42,
    {
      provide: 'Rules',
      useFactory: (HighTurnover, Default, Client42) => [
        HighTurnover,
        Default,
        Client42,
      ],
      inject: [HighTurnover, Default, Client42],
    },
  ],
  controllers: [CommissionController],
})
export class CommissionModule {}

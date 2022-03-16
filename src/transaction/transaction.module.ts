import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [CsvModule],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}

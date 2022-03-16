import { Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import { TransactionDto } from './transaction.dto';
import * as fs from 'fs';

@Injectable()
export class TransactionService {
  constructor(private readonly csvParser: CsvParser) {}

  async getAll(): Promise<TransactionDto[]> {
    const stream = fs.createReadStream(
      __dirname + '/../../src/transaction/data/transactions.csv',
    );
    const parsedData = await this.csvParser.parse(
      stream,
      TransactionDto,
      null,
      null,
      { strict: true, separator: ',' },
    );

    return parsedData.list;
  }
}

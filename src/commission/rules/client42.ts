import { TransactionInfoDto } from './dto/transaction-info.dto';
import { RuleInterface } from './interfaces/rule.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Client42 implements RuleInterface {
  private readonly CLIENT_ID = 42;
  private readonly COMMISSION = 0.05;

  async isApplicable(transactionInfoDto: TransactionInfoDto): Promise<boolean> {
    return transactionInfoDto.client_id === this.CLIENT_ID;
  }

  async calculateCommission(
    transactionInfoDto: TransactionInfoDto,
  ): Promise<number> {
    return this.COMMISSION;
  }
}

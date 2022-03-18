import { Injectable } from '@nestjs/common';
import { TransactionInfoDto } from './dto/transaction-info.dto';
import { RuleInterface } from './interfaces/rule.interface';

@Injectable()
export class ClientWithDiscount implements RuleInterface {
  private readonly CLIENT_ID = 42;
  private readonly COMMISSION = 0.05;

  async isApplicable(transactionInfoDto: TransactionInfoDto): Promise<boolean> {
    return transactionInfoDto.client_id === this.CLIENT_ID;
  }

  async calculateCommission(
    _transactionInfoDto: TransactionInfoDto,
  ): Promise<number> {
    return this.COMMISSION;
  }
}

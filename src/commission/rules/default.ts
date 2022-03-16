import { TransactionInfoDto } from './dto/transaction-info.dto';
import { RuleInterface } from './interfaces/rule.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Default implements RuleInterface {
  private readonly DEFAULT_PERCENT = 0.5;
  private readonly MIN_COMMISSION = 0.05;

  async isApplicable(transactionInfoDto: TransactionInfoDto): Promise<boolean> {
    return true;
  }

  async calculateCommission(
    transactionInfoDto: TransactionInfoDto,
  ): Promise<number> {
    return +Math.max(
      (transactionInfoDto.amount * this.DEFAULT_PERCENT) / 100,
      this.MIN_COMMISSION,
    ).toFixed(2);
  }
}

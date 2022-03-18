import { Injectable } from '@nestjs/common';
import { TransactionInfoDto } from './dto/transaction-info.dto';
import { RuleInterface } from './interfaces/rule.interface';
import { TransactionService } from '../../transaction/transaction.service';

@Injectable()
export class HighTurnover implements RuleInterface {
  private readonly COMMISSION = 0.03;
  private readonly TOTAL_THRESHOLD = 1000;

  constructor(private readonly transactionService: TransactionService) {}

  async isApplicable(transactionInfoDto: TransactionInfoDto): Promise<boolean> {
    const totalPerMonth = await this.transactionService.getTotalPerMonth(
      transactionInfoDto.client_id,
      transactionInfoDto.date.getMonth() + 1,
    );

    return totalPerMonth >= this.TOTAL_THRESHOLD;
  }

  async calculateCommission(
    _transactionInfoDto: TransactionInfoDto,
  ): Promise<number> {
    return this.COMMISSION;
  }
}

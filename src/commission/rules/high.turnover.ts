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
    const [_, transactionMonth] = transactionInfoDto.date.split('-'),
      transactions = await this.transactionService.getAll();

    const filtered = transactions.filter((t) => {
      const [_, month] = t.date.split('-');
      return (
        +transactionMonth === +month &&
        +t.client_id === +transactionInfoDto.client_id
      );
    });

    if (filtered.length === 0) {
      return false;
    }

    const curMonthTotal = filtered.reduce((prev, cur) => {
      return { ...cur, amount: +prev.amount + +cur.amount };
    });

    return curMonthTotal.amount >= this.TOTAL_THRESHOLD;
  }

  async calculateCommission(
    transactionInfoDto: TransactionInfoDto,
  ): Promise<number> {
    return this.COMMISSION;
  }
}

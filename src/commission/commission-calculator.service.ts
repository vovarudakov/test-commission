import { Inject, Injectable } from '@nestjs/common';
import { TransactionRequestDto } from './dto/transaction-request.dto';
import { TransactionService } from '../transaction/transaction.service';
import { CommissionDto } from './dto/commission.dto';
import { RuleInterface } from './rules/interfaces/rule.interface';
import { RequestConverterService } from './transaction/request-converter.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommissionCalculatorService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly requestConverterService: RequestConverterService,
    private configService: ConfigService,
    @Inject('Rules') private rules: RuleInterface[],
  ) {}

  async calculate(
    transactionRequestDto: TransactionRequestDto,
  ): Promise<CommissionDto> {
    const commissions = [];
    const info = await this.requestConverterService.convert(
      transactionRequestDto,
    );

    const commissionPromises = this.rules.map(async (rule) => {
      const isApplicable = await rule.isApplicable(info);
      if (isApplicable) {
        const commission = await rule.calculateCommission(info);
        commissions.push(commission);
      }
    });

    await Promise.all(commissionPromises);

    return {
      amount: this.findMin(commissions).toString(),
      currency: this.configService.get<string>('MAIN_CURRENCY_CODE'),
    };
  }

  private findMin(array: Array<number>): number {
    return array.reduce((prev, cur) => (prev < cur ? prev : cur));
  }
}

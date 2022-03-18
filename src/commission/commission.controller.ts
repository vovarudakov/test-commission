import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { TransactionRequestDto } from './dto/transaction-request.dto';
import { CommissionDto } from './dto/commission.dto';
import { CommissionCalculatorService } from './commission-calculator.service';

@Controller('commission')
export class CommissionController {
  constructor(
    private readonly commissionCalculatorService: CommissionCalculatorService,
  ) {}

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  async calculate(
    @Body() transactionRequestDto: TransactionRequestDto,
  ): Promise<CommissionDto> {
    return this.commissionCalculatorService.calculate(transactionRequestDto);
  }
}

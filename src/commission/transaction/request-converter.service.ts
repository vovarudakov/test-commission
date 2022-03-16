import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionRequestDto } from '../dto/transaction-request.dto';
import { TransactionInfoDto } from '../rules/dto/transaction-info.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Rates } from './types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RequestConverterService {
  private readonly RATES_URL = 'https://api.exchangerate.host/2021-01-01';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async convert(
    transactionRequestDto: TransactionRequestDto,
  ): Promise<TransactionInfoDto> {
    const transactionInfo = {
      client_id: transactionRequestDto.client_id,
      date: transactionRequestDto.date,
      amount: transactionRequestDto.amount,
    };

    if (
      transactionRequestDto.currency ===
      this.configService.get<string>('MAIN_CURRENCY_CODE')
    ) {
      return transactionInfo;
    }

    const response = await firstValueFrom(
      this.httpService.get(this.RATES_URL),
    ).catch(() => {
      throw new HttpException(
        'Exchange service is unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    });

    const rates: Rates = response.data.rates;
    if (!rates[transactionRequestDto.currency]) {
      throw new HttpException(
        'Currency is not supported',
        HttpStatus.BAD_REQUEST,
      );
    }

    const amountInEur =
      transactionRequestDto.amount / rates[transactionRequestDto.currency];

    return {
      ...transactionInfo,
      amount: +amountInEur.toFixed(2),
    };
  }
}

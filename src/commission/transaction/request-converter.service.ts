import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TransactionRequestDto } from '../dto/transaction-request.dto';
import { TransactionInfoDto } from '../rules/dto/transaction-info.dto';
import { Rates } from './types';

@Injectable()
export class RequestConverterService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async convert(
    transactionRequestDto: TransactionRequestDto,
  ): Promise<TransactionInfoDto> {
    const transactionInfo: TransactionInfoDto = {
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
      this.httpService.get(
        this.configService.get<string>('EXCHANGE_SERVICE_URL'),
      ),
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

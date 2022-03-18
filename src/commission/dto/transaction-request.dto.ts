import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TransactionRequestDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsNumber()
  @Type()
  @IsPositive()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  readonly currency: string;

  @IsNotEmpty()
  @IsInt()
  readonly client_id: number;
}

import { TransactionInfoDto } from '../dto/transaction-info.dto';

export interface RuleInterface {
  isApplicable(transactionInfoDto: TransactionInfoDto): Promise<boolean>;
  calculateCommission(transactionInfoDto: TransactionInfoDto): Promise<number>;
}

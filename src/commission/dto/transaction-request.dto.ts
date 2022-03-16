export class TransactionRequestDto {
  readonly date: string;
  readonly amount: number;
  readonly currency: string;
  readonly client_id: number;
}

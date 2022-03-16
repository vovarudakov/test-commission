export class TransactionDto {
  readonly client_id: number
  readonly date: string
  readonly amount: number
  readonly currency: string
  readonly commission_amount: number
  readonly commission_currency: string
}
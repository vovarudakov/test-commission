import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async getAll(): Promise<Transaction[]> {
    return this.transactionModel.find().exec();
  }

  async getTotalPerMonth(client: number, month: number): Promise<number> {
    const total = await this.transactionModel
      .aggregate([
        {
          $project: {
            client_id: 1,
            date: 1,
            amount: 1,
            month: { $month: '$date' },
          },
        },
        { $match: { client_id: client, month: month } },
        {
          $group: {
            _id: null,
            total: {
              $sum: '$amount',
            },
          },
        },
      ])
      .exec();

    return total[0]?.total || 0;
  }
}

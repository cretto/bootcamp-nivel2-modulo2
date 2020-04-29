import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const findAllTransactions = await this.find();

    const income = findAllTransactions.reduce(
      (total, transaction) =>
        transaction.type === 'income' ? total + +transaction.value : total,
      0,
    );

    const outcome = findAllTransactions.reduce(
      (total, transaction) =>
        transaction.type === 'outcome' ? total + +transaction.value : total,
      0,
    );

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }
}

export default TransactionsRepository;

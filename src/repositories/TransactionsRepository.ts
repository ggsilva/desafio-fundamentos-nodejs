import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.all();

    const income = transactions.reduce((total, transaction, index) => {
      const newTransaction = { ...total };
      if (index === 1) newTransaction.value = 0;
      if (transaction.type === 'income') {
        newTransaction.value = transaction.value + total.value;
      }
      return newTransaction;
    }).value;

    const outcome = transactions.reduce((total, transaction, index) => {
      const newTransaction = { ...total };
      if (index === 1) newTransaction.value = 0;
      if (transaction.type === 'outcome') {
        newTransaction.value = transaction.value + total.value;
      }
      return newTransaction;
    }).value;

    const balance = {
      income,
      outcome,
      total: income - outcome
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

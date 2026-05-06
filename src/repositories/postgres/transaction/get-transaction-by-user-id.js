import { PostgresHelper } from '../../../db/postgres/helper.js';
export class GetTransactionByUserId {
  async execute(userId) {
    const transactions = await PostgresHelper.query(
      `SELECT * FROM transactions WHERE id = $1`,
      [userId],
    );
    return transactions;
  }
}

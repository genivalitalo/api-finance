import { PostgresHelper } from '../../../db/postgres/helper.js';
export class PostgresUptadeTransactionRepository {
  async execute(userId, uptadeParams) {
    const uptadeField = [];
    const uptadeValues = [];
    Object.keys(uptadeParams).forEach((key) => {
      uptadeField.push(`${key} = $${uptadeField.length + 1}`);
      uptadeValues.push(uptadeParams[key]);
    });
    uptadeValues.push(userId);

    const updateQuery = `
            UPDATE transactions
            SET ${uptadeField.join(', ')}
            WHERE id = $${uptadeValues.length}
            RETURNING *
        `;

    const updateTransaction = await PostgresHelper.query(
      updateQuery,
      uptadeValues,
    );
    return updateTransaction[0];
  }
}

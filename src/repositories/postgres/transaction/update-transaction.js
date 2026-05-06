import { PostgresHelper } from '../../../db/postgres/helper.js';
export class PostgresUptadeTransactionRepository {
  async execute(transactionId, updateParams) {
    const fields = [];
    const values = [];

    Object.keys(updateParams).forEach((key) => {
      fields.push(`${key} = $${fields.length + 1}`);
      values.push(updateParams[key]);
    });

    if (fields.length === 0) {
      throw new Error('No fields provided for update');
    }

    values.push(transactionId);

    const query = `
      UPDATE transactions
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;

    // 👇 aqui agora retorna array direto
    const rows = await PostgresHelper.query(query, values);

    // 🔥 tratamento correto pro seu caso
    if (!rows || rows.length === 0) {
      return null;
    }

    return rows[0];
  }
}

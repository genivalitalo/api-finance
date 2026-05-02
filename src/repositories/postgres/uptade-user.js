import { PostgresHelper } from '../../db/postgres/helper.js';
export class PostgresUptadeUserRepository {
  async execute(userId, uptadeParams) {
    const uptadeField = [];
    const uptadeValues = [];
    Object.keys(uptadeParams).forEach((key) => {
      uptadeField.push(`${key} = $${uptadeField.length + 1}`);
      uptadeValues.push(uptadeParams[key]);
    });
    uptadeValues.push(userId);

    const updateQuery = `
            UPDATE users
            SET ${uptadeField.join(', ')}
            WHERE id = $${uptadeValues.length}
            RETURNING *
        `;

    const updateUser = await PostgresHelper.query(updateQuery, uptadeValues);
    return updateUser[0];
  }
}

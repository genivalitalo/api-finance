import { PostgresHelper } from '../../db/postgres/helper.js';
export class PostgresGetUserByEmail {
  async execute(email) {
    const userEmail = await PostgresHelper.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );
    return userEmail[0];
  }
}

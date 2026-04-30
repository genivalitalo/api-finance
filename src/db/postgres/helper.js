// db.js
import pg from 'pg';

const { Pool } = pg;

// 🔒 Validação básica das variáveis de ambiente
const requiredEnvs = [
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_HOST',
  'POSTGRES_DB',
  'POSTGRES_PORT',
];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Variável de ambiente ${env} não definida`);
  }
});

// 🚀 Criação do pool
export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT), // garante número
});

// 🧠 Helper de queries (sem vazamento de conexão)
export const PostgresHelper = {
  query: async (text, params = []) => {
    try {
      const result = await pool.query(text, params);
      return result.rows;
    } catch (error) {
      console.error('❌ Erro na query:', error.message);
      throw error;
    }
  },
};

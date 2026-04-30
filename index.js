import dotenv from 'dotenv';
import express from 'express';
import { PostgresHelper } from './src/db/postgres/helper.js';
dotenv.config();

const app = express();

app.get('/', async (req, res) => {
  const results = await PostgresHelper.query('SELECT * FROM users;');
  res.send(JSON.stringify(results));
});

app.listen(3000, () => console.log('Rodando na porta 3000'));

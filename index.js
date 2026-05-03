import 'dotenv/config.js';
import express from 'express';
import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from './src/controllers/index.js';
import { GetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js';
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js';

const app = express();
app.use(express.json());

app.post('/api/users', async (req, res) => {
  const createUserController = new CreateUserController();
  const { statusCode, body } = await createUserController.execute(req);
  res.status(statusCode).json(body);
});

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdRepository = new GetUserByIdRepository();

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  const { statusCode, body } = await getUserByIdController.execute(req);

  console.log(body);
  res.status(statusCode).send(body);
});
app.patch('/api/users/:userId', async (req, res) => {
  const updateUserController = new UpdateUserController();
  const { statusCode, body } = await updateUserController.execute(req);
  res.status(statusCode).send(body);
});
app.delete('/api/users/:userId', async (req, res) => {
  const deletedUserController = new DeleteUserController();
  const { statusCode, body } = await deletedUserController.execute(req);
  res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Rodando na porta ${process.env.PORT}`),
);

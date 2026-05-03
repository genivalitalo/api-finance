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
import { PostgresCreateUser } from './src/repositories/postgres/create-user.js';
import { CreateUserCase } from './src/use-cases/create-user.js';
import { PostgresGetUserByEmail } from './src/repositories/postgres/get-user-by-email.js';
import { PostgresUptadeUserRepository } from './src/repositories/postgres/uptade-user.js';
import { UpdateUserUseCase } from './src/use-cases/uptade-user.js';
import { DeleteUserUseCase } from './src/use-cases/delete-user.js';
import { PostDeleteUserRepository } from './src/repositories/postgres/delete-user.js';

const app = express();
app.use(express.json());

app.post('/api/users', async (req, res) => {
  const createUserRepository = new PostgresCreateUser();
  const getUserByEmailRepository = new PostgresGetUserByEmail();

  const createUserUseCase = new CreateUserCase(
    createUserRepository,
    getUserByEmailRepository,
  );

  const createUserController = new CreateUserController(createUserUseCase);

  const { statusCode, body } = await createUserController.execute({
    body: req.body,
  });
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
  const updatePostgresRepository = new PostgresUptadeUserRepository();
  const getUserByEmailRepository = new PostgresGetUserByEmail();
  const updateUser = new UpdateUserUseCase(
    updatePostgresRepository,
    getUserByEmailRepository,
  );
  const updateUserController = new UpdateUserController(updateUser);
  const { statusCode, body } = await updateUserController.execute({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
});
app.delete('/api/users/:userId', async (req, res) => {
  const deletePostRepository = new PostDeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(deletePostRepository);
  const deletedUserController = new DeleteUserController(deleteUserUseCase);
  const { statusCode, body } = await deletedUserController.execute({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Rodando na porta ${process.env.PORT}`),
);

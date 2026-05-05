import 'dotenv/config.js';
import express from 'express';
import {
  makeGetUserByIdController,
  makePostUserController,
  makeUpdateUserController,
  makeDeleteUserController,
} from './src/factories/controllers/user.js';

const app = express();
app.use(express.json());

app.post('/api/users', async (req, res) => {
  const createUserController = makePostUserController();

  const { statusCode, body } = await createUserController.execute({
    body: req.body,
  });
  res.status(statusCode).json(body);
});

app.get('/api/users/:userId', async (req, res) => {
  const getUserByIdController = makeGetUserByIdController();

  const { statusCode, body } = await getUserByIdController.execute(req);

  console.log(body);
  res.status(statusCode).send(body);
});
app.patch('/api/users/:userId', async (req, res) => {
  const updateUserController = makeUpdateUserController();
  const { statusCode, body } = await updateUserController.execute({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
});
app.delete('/api/users/:userId', async (req, res) => {
  const deletedUserController = makeDeleteUserController();
  const { statusCode, body } = await deletedUserController.execute({
    body: req.body,
    params: req.params,
  });
  res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Rodando na porta ${process.env.PORT}`),
);

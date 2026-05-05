import {
  GetUserByIdRepository,
  PostgresCreateTransactionRepository,
} from '../../repositories/postgres/index.js';
import { CreateTransactionUseCase } from '../../use-cases/index.js';
import { CreateTransactionController } from '../../controllers/index.js';

export const makeCreateTransactionController = () => {
  const postgresRepository = new PostgresCreateTransactionRepository();
  const getUserByIdRepository = new GetUserByIdRepository();
  const createUseCase = new CreateTransactionUseCase(
    postgresRepository,
    getUserByIdRepository,
  );
  const createController = new CreateTransactionController(createUseCase);
  return createController;
};

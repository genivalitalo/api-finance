import {
  GetTransactionByUserId,
  GetUserByIdRepository,
  PostgresCreateTransactionRepository,
  PostgresUptadeTransactionRepository,
} from '../../repositories/postgres/index.js';
import {
  CreateTransactionUseCase,
  GetTransactionUserByIdUseCase,
  UpdateTransactionUseCase,
} from '../../use-cases/index.js';
import {
  CreateTransactionController,
  GetTransactionByUserIdController,
  UpdateTransactionController,
} from '../../controllers/index.js';

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
export const makeGetTransactionController = () => {
  const postgresTransactionRepository = new GetTransactionByUserId();
  const getUserByIdRepository = new GetUserByIdRepository();
  const getTransactionUseCase = new GetTransactionUserByIdUseCase(
    postgresTransactionRepository,
    getUserByIdRepository,
  );
  const getTransactionController = new GetTransactionByUserIdController(
    getTransactionUseCase,
  );
  return getTransactionController;
};
export const makeUpdateTransactionController = () => {
  const postgresUpdateRepository = new PostgresUptadeTransactionRepository();
  const updateUseCase = new UpdateTransactionUseCase(postgresUpdateRepository);
  const updateController = new UpdateTransactionController(updateUseCase);
  return updateController;
};

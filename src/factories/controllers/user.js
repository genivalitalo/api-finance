import {
  PostgresCreateUser,
  PostgresGetUserByEmail,
  GetUserByIdRepository,
  PostgresUptadeUserRepository,
  PostDeleteUserRepository,
} from '../../repositories/postgres/index.js';
import {
  CreateUserCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from '../../use-cases/index.js';
import {
  CreateUserController,
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController,
} from '../../controllers/index.js';

export const makePostUserController = () => {
  const createUserRepository = new PostgresCreateUser();
  const getUserByEmailRepository = new PostgresGetUserByEmail();

  const createUserUseCase = new CreateUserCase(
    createUserRepository,
    getUserByEmailRepository,
  );

  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController;
};

export const makeGetUserByIdController = () => {
  const getUserByIdRepository = new GetUserByIdRepository();

  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
};
export const makeUpdateUserController = () => {
  const updatePostgresRepository = new PostgresUptadeUserRepository();
  const getUserByEmailRepository = new PostgresGetUserByEmail();
  const updateUser = new UpdateUserUseCase(
    updatePostgresRepository,
    getUserByEmailRepository,
  );
  const updateUserController = new UpdateUserController(updateUser);
  return updateUserController;
};
export const makeDeleteUserController = () => {
  const deletePostRepository = new PostDeleteUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(deletePostRepository);
  const deletedUserController = new DeleteUserController(deleteUserUseCase);
  return deletedUserController;
};

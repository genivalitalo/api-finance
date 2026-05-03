import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUser } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmail } from '../repositories/postgres/get-user-by-email.js';
import { EmailAlreadyUseError } from '../errors/user.js';
export class CreateUserCase {
  async execute(params) {
    // TODO: Verificar se o email já está em uso
    const postgresByRepositoryEmail = new PostgresGetUserByEmail();
    const resultAlreadyEmail = await postgresByRepositoryEmail.execute(
      params.email,
    );
    if (resultAlreadyEmail) {
      throw new EmailAlreadyUseError(params.email);
    }
    // Gerar ID do usuário
    const userID = uuidv4();
    // Criptografa senha
    const hashPassword = await bcrypt.hash(params.password, 10);
    // Inserir user no banco de dados
    const user = {
      ...params,
      id: userID,
      password: hashPassword,
    };
    // Chamar o repositório
    const postgresCreateUserRepository = new PostgresCreateUser();
    const createUsers = await postgresCreateUserRepository.execute(user);
    return createUsers;
  }
}

import { PostgresGetUserByEmail } from '../repositories/postgres/get-user-by-email.js';
import { EmailAlreadyUseError } from '../errors/user.js';
import bcrypt from 'bcrypt';
import { PostgresUptadeUserRepository } from '../repositories/postgres/uptade-user.js';
export class UpdateUserUseCase {
  async execute(userId, updateParams) {
    // 1) Se o e-mail está sendo atualizado, verificar se ele estiver em uso
    if (updateParams.email) {
      const postgresByRepositoryEmail = new PostgresGetUserByEmail();
      const resultAlreadyEmail = await postgresByRepositoryEmail.execute(
        updateParams.email,
      );
      if (resultAlreadyEmail && resultAlreadyEmail.id !== userId) {
        throw new EmailAlreadyUseError(updateParams.email);
      }
    }
    const user = {
      ...updateParams,
    };
    // 2) Se a senha estiver sendo atualizanda, cripotografa ela
    if (updateParams.password) {
      const hashPassword = await bcrypt.hash(updateParams.password, 10);
      user.password = hashPassword;
    }
    // 3) Chamar o repository

    const postUserRepository = new PostgresUptadeUserRepository();
    const updateUser = postUserRepository.execute(userId, user);
    return updateUser;
  }
}

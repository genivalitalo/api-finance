import { EmailAlreadyUseError } from '../../errors/user.js';
import bcrypt from 'bcrypt';
export class UpdateUserUseCase {
  constructor(updatePostgresRepository, postgresGetUserByEmail) {
    this.updatePostgresRepository = updatePostgresRepository;
    this.postgresGetUserByEmail = postgresGetUserByEmail;
  }
  async execute(userId, updateParams) {
    // 1) Se o e-mail está sendo atualizado, verificar se ele estiver em uso
    if (updateParams.email) {
      const resultAlreadyEmail = await this.postgresGetUserByEmail.execute(
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

    const updateUser = await this.updatePostgresRepository.execute(
      userId,
      user,
    );
    return updateUser;
  }
}

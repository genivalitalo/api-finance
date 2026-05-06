import { UserNotFound } from '../../errors/user.js';

export class UpdateTransactionUseCase {
  constructor(postgresUptadeTransactionRepository, getUserByIdRepository) {
    this.postgresUptadeTransactionRepository =
      postgresUptadeTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(params) {
    // 1) Validar se o usuário existe
    const user = await this.getUserByIdRepository.execute(params.userId);
    if (!user) {
      throw new UserNotFound();
    }
    // 2) Chamar o repository
    const updateTransaction =
      await this.postgresUptadeTransactionRepository.execute(params);
    return updateTransaction;
  }
}

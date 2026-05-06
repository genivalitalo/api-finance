import { userNotFoundResponse } from '../../controllers/helpers/index.js';
export class GetTransactionUserByIdUseCase {
  constructor(getTransactionByRepository, getUserByIdRepository) {
    this.getTransactionByRepository = getTransactionByRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(params) {
    const user = await this.getUserByIdRepository.execute(params.userId);

    // enviar mensagem de erro para controller
    if (!user) {
      throw new userNotFoundResponse(params.userId);
    }
    const transaction = await this.getTransactionByRepository.execute(
      params.userId,
    );
    return transaction;
  }
}

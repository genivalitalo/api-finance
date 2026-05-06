import {
  serverError,
  userNotFoundResponse,
} from '../../controllers/helpers/index.js';
export class GetTransactionUserByIdUseCase {
  constructor(getTransactionByRepository, getUserByIdRepository) {
    this.getTransactionByRepository = getTransactionByRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(params) {
    try {
      const user = await this.getUserByIdRepository.execute(params.userId);
      if (!user) {
        return userNotFoundResponse();
      }
      const transaction = await this.getTransactionByRepository.execute(
        params.userId,
      );
      return transaction;
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

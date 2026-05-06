import {
  checkIfIdIsValid,
  idInvalid,
  requiredFieldIsMissingResponse,
  serverError,
  sucess,
  userNotFoundResponse,
} from '../helpers/index.js';
export class GetTransactionByUserIdController {
  constructor(getTransactionUserByIdUseCase) {
    this.getTransactionUserByIdUseCase = getTransactionUserByIdUseCase;
  }
  async execute(httpRequest) {
    try {
      const userId = httpRequest.query.userId;
      if (!userId) {
        return requiredFieldIsMissingResponse('userId');
      }

      const idIsValid = checkIfIdIsValid(userId);
      if (!idIsValid) {
        return idInvalid();
      }

      const transactions = await this.getTransactionUserByIdUseCase.execute({
        userId: userId,
      });
      return sucess(transactions);
    } catch (error) {
      console.error(error);
      if (error instanceof userNotFoundResponse) {
        return userNotFoundResponse();
      }
      return serverError();
    }
  }
}

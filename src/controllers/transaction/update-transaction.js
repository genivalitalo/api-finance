import {
  checkIfIdIsValid,
  idInvalid,
  serverError,
  badRequest,
  checkAmountValue,
  checkAmountResponse,
  checkIsTypeValid,
  checkTypeResponse,
  sucess,
} from '../helpers/index.js';
export class UpdateTransactionController {
  constructor(updateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const idIsValid = checkIfIdIsValid(params.transactionId);
      if (!idIsValid) {
        return idInvalid();
      }

      const allowedFields = ['name', 'date', 'amount', 'type'];

      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Algum campo fornecido não é permitido.',
        });
      }
      const amountIsValid = checkAmountValue(params.amount);
      if (!amountIsValid) {
        return checkAmountResponse();
      }

      const typeIsValid = checkIsTypeValid(params.type);
      if (!typeIsValid) {
        return checkTypeResponse();
      }

      const transaction = await this.updateTransactionUseCase.execute(
        httpRequest.params.transactionId,
        params,
      );
      return sucess(transaction);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

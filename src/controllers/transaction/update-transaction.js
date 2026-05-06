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
      const params = httpRequest.body || {};
      const transactionId = httpRequest.params?.transactionId;

      if (!transactionId) {
        return badRequest({ message: 'transactionId is required' });
      }

      const idIsValid = checkIfIdIsValid(transactionId);
      if (!idIsValid) {
        return idInvalid();
      }

      if (Object.keys(params).length === 0) {
        return badRequest({
          message: 'At least one field must be provided for update',
        });
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

      if (params.amount !== undefined) {
        const amountIsValid = checkAmountValue(params.amount);
        if (!amountIsValid) {
          return checkAmountResponse();
        }
      }

      if (params.type !== undefined) {
        const type = params.type.trim().toUpperCase();
        const typeIsValid = checkIsTypeValid(params.type);
        if (!typeIsValid) {
          return checkTypeResponse();
        }
        params.type = type;
      }

      const transaction = await this.updateTransactionUseCase.execute(
        transactionId,
        params,
      );

      return sucess(transaction);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

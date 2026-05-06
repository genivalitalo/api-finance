import {
  checkAmountValue,
  checkIfIdIsValid,
  idInvalid,
  badRequest,
  created,
  serverError,
  validateRequireFields,
  requiredFieldIsMissingResponse,
} from '../helpers/index.js';

export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requireFields = ['user_id', 'name', 'date', 'amount', 'type'];

      const { ok: requiredFieldWasProvider, missingField } =
        validateRequireFields(params, requireFields);

      if (!requiredFieldWasProvider) {
        return requiredFieldIsMissingResponse(missingField);
      }

      const checkUserId = checkIfIdIsValid(params.user_id);
      if (!checkUserId) {
        return idInvalid();
      }

      const checkAmount = checkAmountValue(params.amount);

      if (!checkAmount) {
        return badRequest({
          message: 'Check the amount, this amount is not valid',
        });
      }
      const type = params.type.trim().toUpperCase();
      const typeIsValid = ['GANHO', 'DESPESA', 'INVESTIMENTO'].includes(type);
      if (!typeIsValid) {
        return badRequest({
          message: 'Type not found',
        });
      }
      const transaction = await this.createTransactionUseCase.execute({
        ...params,
        type,
      });
      return created(transaction);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

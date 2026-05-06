import {
  checkAmountValue,
  checkIfIdIsValid,
  idInvalid,
  created,
  serverError,
  validateRequireFields,
  requiredFieldIsMissingResponse,
  checkIsTypeValid,
  checkAmountResponse,
  checkTypeResponse,
  userNotFoundResponse,
} from '../helpers/index.js';
import { UserNotFound } from '../../errors/user.js';
export class CreateTransactionController {
  constructor(createTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body || {};

      const requireFields = ['user_id', 'name', 'date', 'amount', 'type'];

      const { ok, missingField } = validateRequireFields(params, requireFields);

      if (!ok) {
        return requiredFieldIsMissingResponse(missingField);
      }

      const checkUserId = checkIfIdIsValid(params.user_id);
      if (!checkUserId) {
        return idInvalid();
      }

      const checkAmount = checkAmountValue(params.amount);

      if (!checkAmount) {
        return checkAmountResponse();
      }

      const type = params.type.trim().toUpperCase();
      const typeIsValid = checkIsTypeValid(type);
      if (!typeIsValid) {
        return checkTypeResponse();
      }
      const transaction = await this.createTransactionUseCase.execute({
        ...params,
        type,
      });
      return created(transaction);
    } catch (error) {
      console.error(error);
      if (error instanceof UserNotFound) {
        return userNotFoundResponse();
      }
      return serverError();
    }
  }
}

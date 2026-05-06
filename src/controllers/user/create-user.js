import { EmailAlreadyUseError } from '../../errors/user.js';
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  invalidEmail,
  invalidPassword,
  badRequest,
  created,
  serverError,
  validateRequireFields,
} from '../helpers/index.js';

export class CreateUserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requireFields = ['first_name', 'last_name', 'email', 'password'];

      const { ok: requiredFieldWasProvider, missingField } =
        validateRequireFields(params, requireFields);

      if (!requiredFieldWasProvider) {
        return badRequest({
          message: `The field ${missingField} is required.`,
        });
      }

      const isPasswordValid = checkIfPasswordIsValid(params.password);
      if (!isPasswordValid) {
        return invalidPassword();
      }
      const isEmailValid = checkIfEmailIsValid(params.email);
      if (!isEmailValid) {
        return invalidEmail();
      }

      const createdUser = await this.createUserUseCase.execute(params);
      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyUseError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError({ message: `Error in server` });
    }
  }
}

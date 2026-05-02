import { EmailAlreadyUseError } from '../errors/user.js';
import { CreateUserCase } from '../use-cases/create-user.js';
import { badRequest, created, serverError } from './helpers/http.js';
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  invalidEmail,
  invalidPassword,
} from './helpers/user.js';

export class CreateUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;

      const requireFields = ['first_name', 'last_name', 'email', 'password'];

      for (const field of requireFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing param: ${field}` });
        }
      }
      const isPasswordValid = checkIfPasswordIsValid(params.password);
      if (!isPasswordValid) {
        return invalidPassword();
      }
      const isEmailValid = checkIfEmailIsValid(params.email);
      if (!isEmailValid) {
        return invalidEmail();
      }

      const createUserCase = new CreateUserCase();
      const createdUser = await createUserCase.execute(params);

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

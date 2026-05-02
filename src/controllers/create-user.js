import { EmailAlreadyUseError } from '../errors/user.js';
import { CreateUserCase } from '../use-cases/create-user.js';
import { badRequest, created, serverError } from './helpers.js';
import validator from 'validator';

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
      const isNotValidPassword = params.password.length < 6;
      if (isNotValidPassword) {
        return badRequest({ message: `Senha menor que 6 caracteres` });
      }
      const isEmailValid = validator.isEmail(params.email);
      if (!isEmailValid) {
        return badRequest({ message: `E-mail inválido` });
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

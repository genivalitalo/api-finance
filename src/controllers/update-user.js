import { UpdateUserUseCase } from '../use-cases/uptade-user.js';
import { badRequest, serverError, sucess } from './helpers.js';
import { EmailAlreadyUseError } from '../errors/user.js';
import validator from 'validator';
export class UpdateUserController {
  async execute(httpRequest) {
    try {
      // Validar ID antes de tudo
      const idUser = httpRequest.params.userId;
      const isIdValid = validator.isUUID(idUser);
      if (!isIdValid) {
        return badRequest('ID Inválido');
      }
      const userParams = httpRequest.body;

      // Validar os campos recebidos
      const allowedFields = ['first_name', 'last_name', 'email', 'password'];

      // Validar se os campos estão de acordo com o que eu aceito
      const someFieldIsNotAllowed = Object.keys(userParams).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Algum campo fornecido não é permitido.',
        });
      }

      // Validar a senha
      if (userParams.password) {
        const isNotValidPassword = userParams.password.length < 6;
        if (isNotValidPassword) {
          return badRequest({ message: `Senha menor que 6 caracteres` });
        }
      }

      //   Validar e-mail
      if (userParams.email) {
        const isEmailValid = validator.isEmail(userParams.email);
        if (!isEmailValid) {
          return badRequest({ message: `E-mail inválido` });
        }
      }
      const updateUserUseCase = new UpdateUserUseCase();
      const updateUser = await updateUserUseCase.execute(idUser, userParams);
      return sucess(updateUser);
    } catch (error) {
      if (error instanceof EmailAlreadyUseError) {
        return badRequest({ message: error.message });
      }
      console.error(error);
      return serverError();
    }
  }
}

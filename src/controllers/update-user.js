import { EmailAlreadyUseError } from '../errors/user.js';
import {
  checkIfEmailIsValid,
  checkIfIdIsValid,
  checkIfPasswordIsValid,
  idInvalid,
  invalidEmail,
  invalidPassword,
  badRequest,
  serverError,
  sucess,
} from './helpers/index.js';
export class UpdateUserController {
  constructor(updateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }
  async execute(httpRequest) {
    try {
      // Validar ID antes de tudo
      const idUser = httpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(idUser);
      if (!isIdValid) {
        return idInvalid();
      }
      const params = httpRequest.body;

      // Validar os campos recebidos
      const allowedFields = ['first_name', 'last_name', 'email', 'password'];

      // Validar se os campos estão de acordo com o que eu aceito
      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest({
          message: 'Algum campo fornecido não é permitido.',
        });
      }

      // Validar a senha
      if (params.password) {
        const isValidPassword = checkIfPasswordIsValid(params.password);
        if (!isValidPassword) {
          return invalidPassword();
        }
      }

      //   Validar e-mail
      if (params.email) {
        const isEmailValid = checkIfEmailIsValid(params.email);
        if (!isEmailValid) {
          return invalidEmail();
        }
      }
      const updateUser = await this.updateUserUseCase.execute(idUser, params);
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

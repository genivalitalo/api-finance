import {
  checkIfIdIsValid,
  idInvalid,
  notFound,
  serverError,
  sucess,
} from '../helpers/index.js';
export class DeleteUserController {
  constructor(deleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }
  async execute(httpRequest) {
    try {
      // Validar se ID é válido
      const isIdValid = checkIfIdIsValid(httpRequest.params.userId);
      if (!isIdValid) {
        return idInvalid();
      }
      const user = await this.deleteUserUseCase.execute(
        httpRequest.params.userId,
      );
      if (!user) {
        return notFound({ message: 'User not found' });
      }
      return sucess(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

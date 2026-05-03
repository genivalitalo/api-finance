import { DeleteUserUseCase } from '../use-cases/delete-user.js';
import {
  checkIfIdIsValid,
  idInvalid,
  notFound,
  serverError,
  sucess,
} from './helpers/index.js';
export class DeleteUserController {
  async execute(httpRequest) {
    try {
      const params = httpRequest.body;
      // Validar se ID é válido
      const isIdValid = checkIfIdIsValid(params.userId);
      if (!isIdValid) {
        return idInvalid();
      }
      const deleteUser = new DeleteUserUseCase();
      const user = await deleteUser.execute(params.userId);
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

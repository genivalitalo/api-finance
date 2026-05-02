import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { notFound, serverError, sucess } from './helpers/http.js';
import validator from 'validator';
import { idInvalid } from './helpers/user.js';

export class GetUserByIdController {
  async execute(httpRequest) {
    try {
      const isIdValid = validator.isUUID(httpRequest.params.userId);
      if (!isIdValid) {
        return idInvalid();
      }
      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(httpRequest.params.userId);
      if (!user) {
        return notFound({ message: `User not found!` });
      }
      return sucess(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}

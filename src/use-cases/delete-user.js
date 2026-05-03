import { PostDeleteUserRepository } from '../repositories/postgres/delete-user.js';
export class DeleteUserUseCase {
  async execute(userId) {
    const deleteRepository = new PostDeleteUserRepository();
    const deleteUser = await deleteRepository.execute(userId);
    return deleteUser;
  }
}

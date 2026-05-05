export class DeleteUserUseCase {
  constructor(postDeleteUserRepository) {
    this.postDeleteUserRepository = postDeleteUserRepository;
  }
  async execute(userId) {
    const deleteUser = await this.postDeleteUserRepository.execute(userId);
    return deleteUser;
  }
}

export class EmailAlreadyUseError extends Error {
  constructor(email) {
    super(`The e-mail ${email} is already in use.`);
    this.name = 'EmailAlreadyUseError';
  }
}
export class UserNotFound extends Error {
  constructor(userId) {
    super(`The ID: ${userId} not already in use.`);
    this.name = 'UserNotFound';
  }
}

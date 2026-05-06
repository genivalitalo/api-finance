export class UpdateTransactionUseCase {
  constructor(postgresUptadeTransactionRepository) {
    this.postgresUptadeTransactionRepository =
      postgresUptadeTransactionRepository;
  }
  async execute(transactionId, params) {
    const updateTransaction =
      await this.postgresUptadeTransactionRepository.execute(
        transactionId,
        params,
      );
    return updateTransaction;
  }
}

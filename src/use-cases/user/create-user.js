import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { EmailAlreadyUseError } from '../../errors/user.js';
export class CreateUserCase {
  constructor(postgresCreateUser, postgresGetUserByEmailRepository) {
    this.postgresCreateUser = postgresCreateUser;
    this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository;
  }
  async execute(params) {
    // TODO: Verificar se o email já está em uso
    const resultAlreadyEmail =
      await this.postgresGetUserByEmailRepository.execute(params.email);
    if (resultAlreadyEmail) {
      throw new EmailAlreadyUseError(params.email);
    }
    // Gerar ID do usuário
    const userID = uuidv4();
    // Criptografa senha
    const hashPassword = await bcrypt.hash(params.password, 10);
    // Inserir user no banco de dados
    const user = {
      ...params,
      id: userID,
      password: hashPassword,
    };
    // Chamar o repositório
    const createUsers = await this.postgresCreateUser.execute(user);
    return createUsers;
  }
}

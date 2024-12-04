import bcrypt from 'bcrypt';
import EncryptionAdapter from '../../Application/Adapters/EncryptionAdapter.js';
import DomainException from '../../../@seedwork/Domain/Exceptions/DomainException.js';

export default class EncryptionService extends EncryptionAdapter {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    super()
    this.saltRounds = saltRounds;  // Número de rounds de salt para o bcrypt
  }

  /**
   * Método encrypt
   *
   * Descrição:
   *   Criptografa uma senha.
   *
   * @param {string} password A senha a ser criptografada.
   * @returns {Promise<string>} A senha criptografada.
   */
  async encrypt(password: string): Promise<string> {
    let hashedPassword;
    try{
      hashedPassword = await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      throw new DomainException("Internal server error")
    }
    return hashedPassword;
  }

  /**
   * Método verifyPasswords
   *
   * Descrição:
   *   Verifica se a senha fornecida corresponde à senha criptografada.
   *
   * @param {string} password A senha fornecida.
   * @param {string} hashedPassword A senha criptografada.
   * @returns {Promise<boolean>} Retorna true se as senhas coincidirem, caso contrário, false.
   */
  async verifyPasswords(password: string, hashedPassword: string): Promise<boolean> {
    let match;
    try {
      match = await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new DomainException("Internal server error")
    }
    return match;
  }
}

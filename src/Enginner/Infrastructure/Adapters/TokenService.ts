import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import TokenAdapter from '../../Application/Adapters/TokenAdapter.js';

// Carregar variáveis de ambiente
dotenv.config();

export default class TokenService extends TokenAdapter {
  private secretKey: string;

  constructor() {
    super();
    // Carrega a chave secreta do arquivo .env
    this.secretKey = process.env.JWT_SECRET || '';

    if (!this.secretKey) {
      throw new Error('JWT_SECRET is not defined in the .env file');
    }
  }

  /**
   * Decodifica e verifica o token JWT usando a chave secreta.
   * @param token - O token JWT a ser decodificado.
   * @returns O payload decodificado.
   */
  async decodeToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      console.error('Token decoding failed:', error);
      throw new Error('Failed to decode token');
    }
  }

  /**
   * Decodifica o token JWT sem verificação de assinatura.
   * @param token - O token JWT.
   * @returns O payload decodificado.
   */
  decodeTokenWithoutVerification(token: string): any {
    return jwt.decode(token);
  }
}

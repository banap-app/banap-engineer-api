import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import TokenService from '../../../Adapters/TokenService.js'; // Importação do TokenService

// Carregar variáveis de ambiente
dotenv.config();

export default class AuthMiddleware {
  private tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService(); // Instancia o serviço de token
  }

  // Middleware para verificar e decodificar o token
  public async verifyTokenMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers['authorization']?.split(' ')[1]; // Supondo 'Bearer <token>'

    if (!token) {
      res.status(400).json({ error: 'Token is required' });
      return;
    }

    try {
      // Decodificar e verificar o token
      const decodedPayload = await this.tokenService.decodeToken(token);

      if (!decodedPayload) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
      }

      // Anexa o payload decodificado ao objeto `Request`
      (req as any).decodedToken = decodedPayload;

      next(); // Continua para o próximo middleware/controller
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(500).json({ error: 'Failed to verify token' });
    }
  }
}

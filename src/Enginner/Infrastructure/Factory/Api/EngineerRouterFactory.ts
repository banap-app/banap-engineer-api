import EngineerRouter from '../../Http/Api/EngineerRouter.js';
import AuthMiddleware from '../../Http/Api/Middlewares/AuthMiddleware.js';
import EngineerControllerFactory from '../Controllers/EngineerControllerFactory.js';


export default class EngineerRouterFactory {
  static create(): EngineerRouter {
    // Usando as fábricas dos controladores e middlewares para criar as instâncias necessárias
    const engineerController = EngineerControllerFactory.create();
    const authMiddleware = new AuthMiddleware()

    // Retornando uma nova instância do EngineerRouter com as dependências injetadas
    return new EngineerRouter(engineerController, authMiddleware);
  }
}

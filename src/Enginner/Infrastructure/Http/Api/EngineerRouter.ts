import { Router, Request, Response, RequestHandler } from "express";
import EngineerController from "../Controllers/EnginnerController.js";
import AuthMiddleware from "../Api/Middlewares/AuthMiddleware.js";
import {
  HttpResponse,
  HttpRequest,
} from "../../../../@seedwork/Infrastructure/Api/index";

export default class EngineerRouter {
  private router: Router;
  private engineerController: EngineerController;
  private authMiddleware: AuthMiddleware;

  constructor(
    engineerController: EngineerController,
    authMiddleware: AuthMiddleware
  ) {
    if (!(engineerController instanceof EngineerController)) {
      throw new Error(
        "engineerController must be an instance of EngineerController"
      );
    }

    if (!(authMiddleware instanceof AuthMiddleware)) {
      throw new Error("authMiddleware must be an instance of AuthMiddleware");
    }

    this.engineerController = engineerController;
    this.authMiddleware = authMiddleware;
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Route for creating engineer (no authentication required)
    this.router.post("/create", this.handleCreateEngineer);

    // Route for getting engineer data (authentication required)
    // Aqui usamos o verifyTokenMiddleware para verificar o token na requisição
    this.router.get(
      "/get",
      this.authMiddleware.verifyTokenMiddleware.bind(this.authMiddleware),
      this.handleGetEngineer.bind(this)
    );
  }

  // Handler for creating engineer
  private handleCreateEngineer: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    
    try {
      const httpRequest: HttpRequest = {
        method: req.method as "GET" | "POST" | "PUT" | "DELETE",
        path: req.originalUrl,
        body: req.body,
        headers: req.headers as Record<string, string>,
      };

      const result: HttpResponse = await this.engineerController.handle(
        httpRequest
      );

      res.status(result.statusCode).json(result.body); 
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  // Handler for getting engineer
  private handleGetEngineer: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const decodedToken = (req as any).decodedToken;

    console.log('Decoded Token:', decodedToken); 
    try {
      const httpRequest: HttpRequest = {
        method: req.method as "GET" | "POST" | "PUT" | "DELETE",
        path: req.originalUrl,
        body: req.body,
        headers: req.headers as Record<string, string>,
        params: {
          id: (req as any).decodedToken.sub
        }
      };

      const result: HttpResponse = await this.engineerController.handle(
        httpRequest
      );

      if (!result.body) {
        res.status(400).json({ error: "Engineer not found" });
        return;
      }

      res.status(result.statusCode).json(result.body); // Retorna a resposta com o código de status e o corpo
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  };

  public getRouter(): Router {
    return this.router;
  }
}

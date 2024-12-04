import CreateEngineerUseCase from '../../../Application/UseCases/Create/CreateEnginnerUseCase.js';
import UseCase from '../../../../@seedwork/Application/UseCase.js';
import Controller from '../../../../@seedwork/Infrastructure/Controller.js';
import GetEngineerUseCase from '../../../Application/UseCases/Retrive/Get/GetEnginnerUseCase.js';
import { HttpRequest, HttpResponse } from '../../../../@seedwork/Infrastructure/Api/index.js';
import CreateEngineerCommand from '../../../Application/UseCases/Create/CreateEnginnerCommand.js';
import GetEngineerCommand from '../../../Application/UseCases/Retrive/Get/GetEngineerCommand.js';

export default class EngineerController extends Controller {
  private useCaseCreate: CreateEngineerUseCase;
  private useCaseGetEngineer: GetEngineerUseCase;

  constructor(
    useCaseCreate: CreateEngineerUseCase,
    useCaseGetEngineer: GetEngineerUseCase
  ) {
    super();

    if (!useCaseCreate) {
      throw new Error('useCaseCreate is required');
    }
    if (!useCaseGetEngineer) {
      throw new Error('useCaseGetEngineer is required');
    }

    this.useCaseCreate = useCaseCreate;
    this.useCaseGetEngineer = useCaseGetEngineer;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    switch (httpRequest.method) {
      case 'POST':
        switch (httpRequest.path) {
          case '/engineer/create':
            return await this.create(httpRequest.body);
          default:
            throw new Error(`Path ${httpRequest.path} is not allowed for method POST`);
        }
      case 'GET':
        switch (httpRequest.path) {
          case '/engineer/get':
            return await this.getEngineer(httpRequest);
          default:
            throw new Error(`Path ${httpRequest.path} is not allowed for method GET`);
        }
      default:
        throw new Error(`Method ${httpRequest.method} is not allowed`);
    }
  }

  async create(data: any): Promise<HttpResponse> {
    if (!data) {
      throw new Error('Data is required');
    }

    console.log(data)
    const input = new CreateEngineerCommand(data);
    const output = await  this.useCaseCreate.execute(input);
    
    return this.formatResponse(output);
  }

  async getEngineer(data: any): Promise<HttpResponse> {
    if (!data) {
      throw new Error('Data is required');
    }
    console.log(data)

    const input = new GetEngineerCommand(data.params.id);
    const output = await this.useCaseGetEngineer.execute(input);

    return this.formatResponse(output);
  }

  private formatResponse(output: any): HttpResponse {
    // Exemplo de formato de resposta, ajuste conforme a lógica de seu projeto.
    return {
      statusCode: 200,
      body: output,
    };
  }
}

import GetEngineerUseCase from "../../../Application/UseCases/Retrive/Get/GetEnginnerUseCase.js";
import TokenService from "../../Adapters/TokenService.js";
import EngineerPostgres from "../../Repository/EngineerRepository.js";


export default class GetEngineerUseCaseFactory {
  static create(): GetEngineerUseCase {
    const engineerRepository = new EngineerPostgres();
    const tokenService = new TokenService()
    return new GetEngineerUseCase(engineerRepository, tokenService);
  }
}

import EngineerController from "../../Http/Controllers/EnginnerController.js";
import CreateEngineerUseCaseFactory from "../UseCases/CreateEngineerUseCaseFactory.js";
import GetEngineerUseCaseFactory from "../UseCases/GetEngineerUseCaseFactory.js";


export default class EngineerControllerFactory {
  static create(): EngineerController {
    const useCaseCreate = CreateEngineerUseCaseFactory.create();
    const useCaseGetEngineer = GetEngineerUseCaseFactory.create();
    return new EngineerController(useCaseCreate, useCaseGetEngineer);
  }
}

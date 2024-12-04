import CreateEngineerUseCase from '../../../Application/UseCases/Create/CreateEnginnerUseCase.js';
import EncryptionService from '../../Adapters/EncryptionService.js';
import EngineerPostgres from '../../Repository/EngineerRepository.js';

export default class CreateEngineerUseCaseFactory {

  static create(): CreateEngineerUseCase {
    const engineerRepository = new EngineerPostgres()
    const encryptionService = new EncryptionService();
    return new CreateEngineerUseCase(engineerRepository, encryptionService);
  }
}

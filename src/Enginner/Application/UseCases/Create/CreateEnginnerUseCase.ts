import Engineer from '../../../Domain/Enginner.js'
import UseCase from '../../../../@seedwork/Application/UseCase.js'
import EncryptionAdapter from '../../Adapters/EncryptionAdapter.js'
import CreateEngineerOutput from './CreateEnginnerOutput.js';
import CreateEngineerCommand from './CreateEnginnerCommand.js';
import EnginnerGateway from '../../../Domain/EnginnerGateway.js';



/**
 * Classe CreateEngineerUseCase
 *
 * Descrição:
 *   Esta classe representa o caso de uso para criar um novo engenheiro no sistema.
 */
export default class CreateEngineerUseCase extends UseCase<CreateEngineerCommand, CreateEngineerOutput> {
  private engineerRepository: EnginnerGateway;
  private encryptionService: EncryptionAdapter;

  /**
   * Construtor da classe CreateEngineerUseCase
   *
   * @param {EngineerRepository} engineerRepository Objeto que implementa a interface EngineerRepository para interagir com o armazenamento de engenheiros.
   * @param {EncryptionService} encryptionService Objeto que implementa a funcionalidade de criptografia de senha.
   *
   * @throws {Error} Lança um erro se engineerRepository ou encryptionService não forem fornecidos ou não forem do tipo esperado.
   */
  constructor (engineerRepository: EnginnerGateway, encryptionService: EncryptionAdapter) {
    super();
    if (!encryptionService || !(encryptionService instanceof EncryptionAdapter)) {
      throw new Error('encryptionService is required and must be an instance of EncryptionService');
    }

    this.engineerRepository = engineerRepository;
    this.encryptionService = encryptionService;
  }

  /**
   * Método execute
   *
   * Descrição:
   *   Executa o caso de uso para criar um novo engenheiro.
   *
   * @param {CreateEngineerUseCase.InputClass} data Instância da classe CreateEngineerUseCase.InputClass contendo os dados do engenheiro a ser criado.
   *
   * @returns {Promise<CreateEngineerUseCase.OutputClass>} Uma promessa que resolve com um objeto contendo um indicador de sucesso e uma mensagem.
   *
   * @throws {Error} Lança um erro se os dados fornecidos não forem uma instância de InputClass.
   */
  async execute(data: CreateEngineerCommand): Promise<CreateEngineerOutput> {
    
    // Verifica se o e-mail já está em uso
    const engineers = await this.engineerRepository.findByEmail(data.email);

    if (engineers.length !== 0) {
      return new CreateEngineerOutput(false, 'Email is already in use');
    }

    // Criptografa a senha
    const passwordHash = await this.encryptionService.encrypt(data.password);


    const engineer = new Engineer(data.name, data.password, data.email,data.crea, data.active, 1);
    engineer.set('password', passwordHash);

    // Salva o engenheiro no repositório
    await this.engineerRepository.save(engineer);

    return new CreateEngineerOutput(true, 'Engineer successfully created');
  }
}

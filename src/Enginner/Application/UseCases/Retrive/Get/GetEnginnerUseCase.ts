import Engineer from "../../../../Domain/Enginner.js";
import UseCase from "../../../../../@seedwork/Application/UseCase.js";
import EnginnerGateway from "../../../../Domain/EnginnerGateway.js";
import GetEngineerCommand from "./GetEngineerCommand.js";
import GetEngineerOutput from "./GetEngineerOutput.js";
import TokenAdapter from "../../../Adapters/TokenAdapter.js";

export default class GetEngineerUseCase extends UseCase<
  GetEngineerCommand,
  GetEngineerOutput
> {
  private engineerRepository: EnginnerGateway;
  private tokenService: TokenAdapter

  constructor(engineerRepository: EnginnerGateway, tokenService: TokenAdapter) {
    super();
    this.tokenService = tokenService;
    this.engineerRepository = engineerRepository;
  }

  async execute(data: GetEngineerCommand): Promise<GetEngineerOutput> {
    console.log(data.id)
    //const id = await this.tokenService.decodeToken(data.id)

    const engineer = await this.engineerRepository.findById(data.id);

    console.log(engineer)

    if (engineer === null) {
      return new GetEngineerOutput(
        false,
        "Not found Engineer",
        null,
        null,
        null,
        null,
        null,
        null
      );
    }

    return new GetEngineerOutput(
      true,
      "Engineer successfully created",
      engineer.get("id").getValue(),
      engineer.get("name"),
      engineer.get("email"),
      engineer.get("active"),
      engineer.get("created_at"),
      engineer.get("crea").getValue()
    );
  }
}

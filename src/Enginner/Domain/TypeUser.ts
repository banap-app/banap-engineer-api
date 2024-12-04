import DomainException from '../../@seedwork/Domain/Exceptions/DomainException.js';

/**
 * Classe que representa um tipo de usuário.
 */
export default class TypeUser {
  private typeId: number;
  private typeName: string;

  /**
   * Cria uma instância de TypeUser.
   * @param {number} typeId - O ID numérico do tipo de usuário.
   * @throws {DomainException} Lança uma exceção se o tipo for inválido.
   */
  constructor(typeId: number) {
    const validTypes: { [key: number]: string } = {
      1: 'Engineer',
      2: 'Productor'
    };

    if (!validTypes[typeId]) {
      throw new DomainException(`Invalid user type. Valid IDs are: ${Object.keys(validTypes).join(', ')}`);
    }

    this.typeId = typeId;
    this.typeName = validTypes[typeId];
  }

  /**
   * Retorna o ID do tipo de usuário.
   * @returns {number} O ID do tipo de usuário.
   */
  getId(): number {
    return this.typeId;
  }

  /**
   * Retorna o nome do tipo de usuário.
   * @returns {string} O nome do tipo de usuário.
   */
  getName(): string {
    return this.typeName;
  }
}

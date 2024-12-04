import DomainException from '../../@seedwork/Domain/Exceptions/DomainException.js';

/**
 * Classe que representa o número de registro no CREA (Conselho Regional de Engenharia e Agronomia).
 */
export default class Crea {
  private crea: number;

  /**
   * Cria uma instância de Crea.
   * @param crea - O número de registro no CREA.
   * @throws {DomainException} Lança uma exceção se o Crea não estiver definido, for menor que 10 caracteres ou não for um número.
   */
  constructor(crea: number) {
    if (crea === undefined) {
      throw new DomainException('Crea must be defined');
    }

    if (crea.toString().length < 10) {
      throw new DomainException('Crea must be at least 10 characters');
    }

    if (typeof crea !== 'number') {
      throw new DomainException('Crea must be a number');
    }

    this.crea = crea;
  }

  public getValue(): number {
    return this.crea;
  }
}

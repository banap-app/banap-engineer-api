import DomainException from '../../../@seedwork/Domain/Exceptions/DomainException.js';

/**
 * Classe DomainValidator
 *
 * Descrição:
 *   Esta classe fornece métodos de validação para domínios no contexto do domínio de negócios.
 */
export default class DomainValidator {
  /**
   * Método str_validate_length
   *
   * Descrição:
   *   Valida o comprimento de uma string de domínio.
   *
   * @param domain A string de domínio a ser validada.
   * @param strMax O comprimento máximo permitido para a string de domínio.
   *
   * @throws {DomainException} Lança uma exceção se strMax não for um número.
   * @throws {DomainException} Lança uma exceção se o comprimento da string de domínio exceder strMax.
   */
  static str_validate_length(domain: string, strMax: number): void {
    if (typeof strMax !== 'number') {
      throw new DomainException('Must be a number');
    }

    if (domain.length > strMax) {
      throw new DomainException('Domain is too long');
    }
  }

  /**
   * Método str_is_not_empty
   *
   * Descrição:
   *   Valida se uma string de domínio não está vazia.
   *
   * @param domain A string de domínio a ser validada.
   *
   * @throws {DomainException} Lança uma exceção se a string de domínio estiver vazia.
   */
  static str_is_not_empty(domain: string): void {
    if (domain.length === 0) {
      throw new DomainException('Prop is required');
    }
  }
}

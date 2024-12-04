import DomainException from '../../@seedwork/Domain/Exceptions/DomainException.js';

/**
 * Classe que representa um endereço de email.
 */
export default class Email {
  private email: string;

  /**
   * Cria uma instância de Email.
   * @param email - O endereço de email a ser validado e armazenado.
   * @throws {DomainException} Lança uma exceção se o email não estiver definido, for menor que 5 caracteres, não contiver '@' ou '.' ou se a posição do último '.' não estiver definida.
   */
  constructor(email: string) {
    if (email.length === 0 || email === '') {
      throw new DomainException('Email is required');
    }

    if (email.length < 5) {
      throw new DomainException('Email is not valid');
    }

    const lastDotIndex = email.lastIndexOf('.');
    if (lastDotIndex === -1 || email[lastDotIndex + 1] === undefined) {
      throw new DomainException('Email is not valid');
    }

    if (!email.includes('@')) {
      throw new DomainException('Email is not valid');
    }

    if (!email.includes('.')) {
      throw new DomainException('Email is not valid');
    }

    this.email = email;
  }

  /**
   * Retorna o endereço de email.
   * @returns O endereço de email.
   */
  toString(): string {
    return this.email;
  }
}

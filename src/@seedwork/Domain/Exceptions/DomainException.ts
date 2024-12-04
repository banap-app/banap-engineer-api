/**
 * Classe que representa uma exceção do domínio.
 * Esta classe estende a classe Error.
 */
export default class DomainException extends Error {
    /**
     * Cria uma instância de DomainException.
     * @param message - A mensagem de erro associada à exceção.
     */
    constructor(message: string) {
      super(message);
      this.name = 'DomainException';
      
      // Captura o stack trace se disponível
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, DomainException);
      }
    }
  }
  
export default class Controller {
    /**
     * Método handle
     * 
     * Descrição:
     *  Este método deve ser implementado nas subclasses. Ele é responsável por
     *  manipular a requisição recebida e retornar uma resposta.
     * 
     * @param {any} httpRequest Dados da requisição HTTP.
     * @returns {Promise<any>} Retorna uma promessa com a resposta para a requisição.
     */
    handle(httpRequest: any): Promise<any> {
      throw new Error('Not implemented');
    }
  }
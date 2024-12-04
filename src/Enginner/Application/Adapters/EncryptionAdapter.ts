export default  abstract class EncryptionAdapter {
    /**
     * Método encrypt
     *
     * Descrição:
     *   Criptografa uma senha.
     *
     * @param {string} password A senha a ser criptografada.
     * @returns {string} A senha criptografada.
     */
    encrypt(password: string): string | Promise<string> {
      // Lógica para criptografar a senha (substitua com a implementação real)
      return password;  // Aqui apenas retornamos a senha como exemplo
    }
  
    /**
     * Método verifyPasswords
     *
     * Descrição:
     *   Verifica se a senha fornecida corresponde à senha criptografada.
     *
     * @param {string} password A senha fornecida.
     * @param {string} hashedPassword A senha criptografada.
     * @returns {boolean} Retorna true se as senhas coincidirem, caso contrário, false.
     */
    verifyPasswords(password: string, hashedPassword: string): boolean | Promise<boolean> {
      // Lógica para verificar se a senha corresponde à senha criptografada
      return password === hashedPassword;  // Exemplo simples, substitua com a lógica real
    }
  }
  
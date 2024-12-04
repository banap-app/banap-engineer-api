export interface HttpRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Métodos HTTP suportados
  path: string;
  body: any;  // Dados enviados na requisição
  headers?: Record<string, string>; // Cabeçalhos opcionais
  params?: Record<string, any>; // Parâmetros opcionais
}

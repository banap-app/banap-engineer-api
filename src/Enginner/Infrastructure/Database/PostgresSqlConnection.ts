import pkg, { PoolClient } from 'pg';
import { configDotenv } from 'dotenv';

const { Pool } = pkg

configDotenv({ path: '.env' });

export default class PostgresConnection {
  static pool = new Pool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    port: parseInt(process.env.PORT_DB || '5432', 10) // Porta padrão do PostgreSQL
  });

  static async connect(): Promise<PoolClient> {
    const client = await this.pool.connect();
    return client;
  }

  static async disconnect(client: PoolClient): Promise<void> {
    if (client) {
      client.release(); // Libera a conexão de volta para o pool
    }
  }
}

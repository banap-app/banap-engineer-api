import { PoolClient } from "pg";
import Engineer from "../../Domain/Enginner.js"; // Importe a classe Engineer
import EngineerGateway from "../../Domain/EnginnerGateway.js";
import PostgresConnection from "../Database/PostgresSqlConnection.js"; // Conexão com o banco de dados

export default class EngineerPostgres implements EngineerGateway {
  // Método para criar conexão com o banco de dados
  private async createConnection() {
    return await PostgresConnection.connect();
  }

  // Método para fechar a conexão com o banco de dados
  private async closeConnection(client: PoolClient) {
    return await PostgresConnection.disconnect(client);
  }

  // Método para salvar um engenheiro no banco de dados
  async save(engineer: Engineer): Promise<Engineer> {
    const client = await this.createConnection();
    try {
      // Inserção na tabela users (primeiro)
      const sql = ` INSERT INTO users (
          id, name_user, password_user, email, created_at, active, type_user_id
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      await client.query(sql, [
        engineer.get("id").getValue(),
        engineer.get("name"),
        engineer.get("password"),
        engineer.get("email"),
        engineer.get("created_at"),
        engineer.get("active"),
        engineer.get("type_user_id"),
      ]);

      const sqlEngineerCrea = `
        INSERT INTO EngineerCrea (
          idEngineer, valueCrea
        ) 
        VALUES ($1, $2)
      `;
      const valueCrea = engineer.get("crea").getValue();

      await client.query(sqlEngineerCrea, [
        engineer.get("id").getValue(),
        valueCrea,
      ]);

      return engineer;
    } catch (err) {
      console.error(err);
      throw new Error("Error saving engineer and Crea");
    } finally {
      await this.closeConnection(client);
    }
  }

  async update(engineer: Engineer): Promise<Engineer> {
    const client = await this.createConnection();
    try {
      const sql = `
        UPDATE engineers 
        SET 
          name = $2, email = $3, specialty = $4, active = $5
        WHERE id = $1
      `;
      await client.query(sql, [
        engineer.get("id"),
        engineer.get("name"),
        engineer.get("email"),
        engineer.get("name"),
        engineer.get("active"),
      ]);
      return engineer;
    } catch (err) {
      console.error(err);
      throw new Error("Error updating engineer");
    } finally {
      await this.closeConnection(client);
    }
  }

  async findByEmail(email: string): Promise<Engineer[]> {
    const client: PoolClient = await this.createConnection();
    try {
      const sql =
        "SELECT u.*, e.valueCrea FROM public.users u JOIN  public.EngineerCrea e ON u.id = e.idEngineer WHERE u.email = $1";
      const res = await client.query(sql, [email]);

      if (res.rows.length === 0) {
        console.warn(`No users found with email: ${email}`);
        return []; // Retorna uma lista vazia se não encontrar nenhum engenheiro
      }

      // Supondo que a row tenha os campos id, name, email, specialty, created_at, active, etc.
      return res.rows.map((row: any) => {
        console.log(row);
        return new Engineer(
          row.name_user, // nome
          row.password_user, // especialidade
          row.email,
          parseInt(row.valuecrea), // email
          row.active, // ativo
          row.type_user_id,
          row.id
        );
      });
    } catch (err) {
      console.error(`Error finding engineer by email: ${email}`, err);
      throw new Error("Error retrieving engineer data"); // Lança uma exceção personalizada se ocorrer um erro
    } finally {
      await this.closeConnection(client);
    }
  }

  async findById(id: string): Promise<Engineer | null> {
    const client = await this.createConnection();
    try {
      const sql = "SELECT * FROM users WHERE id = $1";
      const res = await client.query(sql, [id]);

      if (res.rows.length > 0) {
        // Supondo que a row tenha os campos id, name, email, specialty, created_at, active, etc.
        const row = res.rows[0];
        console.log(row);


        // Criando o engenheiro com os dados extraídos da linha
        return new Engineer(
          row.name_user, // nome
          row.password_user, // especialidade
          row.email,
          parseInt(row.valuecrea), // email
          row.active, // ativo
          row.type_user_id,
          row.id
        );
      }

      return null; // Retorna null caso não encontre
    } catch (err) {
      console.error(`Error finding engineer by id: ${id}`, err);
      return null; // Retorna null caso ocorra um erro
    } finally {
      await this.closeConnection(client);
    }
  }

  // Método para excluir um engenheiro pelo ID
  async delete(id: string): Promise<boolean> {
    const client = await this.createConnection();
    try {
      const sql = "DELETE FROM engineers WHERE id = $1";
      const res = await client.query(sql, [id]);
      return res.rowCount !== null && res.rowCount > 0;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      await this.closeConnection(client);
    }
  }
}

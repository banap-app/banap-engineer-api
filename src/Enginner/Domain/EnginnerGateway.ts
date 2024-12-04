import Engineer from "./Enginner.js";

export default interface EngineerGateway {
    save(engineer: Engineer): Promise<Engineer>;
    update(engineer: Engineer): Promise<Engineer>;
    findByEmail(email: string): Promise<Engineer[]>;
    findById(id: string): Promise<Engineer | null>;
    delete(id: string): Promise<boolean>;
  }
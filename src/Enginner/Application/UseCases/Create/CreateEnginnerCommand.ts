export default class CreateEngineerCommand {
  id?: string;
  name: string;
  email: string;
  password: string;
  active: boolean;
  crea: number;

  constructor(data: { id?: string, name: string, email: string, password: string, active: boolean, crea: number }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.active = data.active;
    this.crea = data.crea;
  }
}
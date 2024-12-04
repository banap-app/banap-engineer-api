import { v4, validate as validateUuid } from 'uuid';
import AggregateRoot from '../../@seedwork/Domain/AggregateRoot.js';
import Password from './Password.js';
import Email from './Email.js';
import Crea from './Crea.js';
import DomainValidator from './Validators/DomainValidator.js';
import EngineerID from './EnginnerID.js';
import DomainException from '../../@seedwork/Domain/Exceptions/DomainException.js';
import TypeUser from './TypeUser.js';

/**
 * Classe que representa um engenheiro.
 */
export default class Engineer extends AggregateRoot<EngineerID> {
  /**
   * @type {PrivateProperties}
   */
  private props: {
    id: EngineerID;
    name: string;
    password: string;
    email: string;
    active: boolean;
    created_at: string;
    crea: Crea;
    type_user_id: number;
    type_user_name: string;
  };

  /**
   * Cria uma instância de Engineer.
   * @param name - O nome do engenheiro
   * @param password - A senha do engenheiro
   * @param email - O email do engenheiro
   * @param id - A identificação única do engenheiro (opcional, será gerada automaticamente se não fornecida)
   * @param active - O estado de ativação do engenheiro
   * @param crea - O número de registro no CREA do engenheiro
   */
  constructor(
    name: string,
    password: string,
    email: string,
    crea: number,
    active: boolean = true,
    typeUserId: number,
    id?: string
  ) {
    // Se o id for fornecido, usamos EngineerID.fromString(id). Caso contrário, geramos um novo ID.
    super(id ? EngineerID.fromString(id) : EngineerID.unique()); 
    const typeUser = new TypeUser(typeUserId)
    this.props = {
      name,
      id: id ? EngineerID.fromString(id) : EngineerID.unique(), // Usa fromString se id for fornecido
      password: new Password(password).toString(),
      email: new Email(email).toString(),
      active,
      created_at: new Date().toISOString(),
      crea: new Crea(crea),
      type_user_id : typeUser.getId(),
      type_user_name : typeUser.getName()
    };
    this.validate();
  }

  public get<K extends keyof typeof this.props>(propName: K): typeof this.props[K] {
    const value = this.props[propName];
    if (value === undefined) {
      throw new DomainException(`Property '${propName}' not found`);
    }
    return value;
  }

  /**
   * Valida as propriedades da instância de Engineer.
   * @throws {TypeException} Lança uma exceção se alguma propriedade não estiver no formato correto.
   * @throws {Error} Lança uma exceção se o ID não for um UUID válido.
   */
  validate(): void {
    if (typeof this.get('name') !== 'string') {
      
      throw new DomainException('Name must be a string');
    }

    if (typeof this.get('password') !== 'string') {
      throw new DomainException('Password must be a string');
    }

    if (typeof this.get('email') !== 'string') {
      throw new DomainException('Email must be a string');
    }

    if (typeof this.get('id').getValue() !== 'string') {
      console.log(this.get('id'));
      throw new DomainException('ID must be a string');
    }

    if (typeof this.get('created_at') !== 'string') {
      throw new DomainException('CreateAt must be a string');
    }

    if (typeof this.get('active') !== 'boolean') {
      throw new DomainException('Active must be a boolean');
    }

    if (!validateUuid(this.get('id').getValue())) {
      throw new Error('ID must be a valid UUID');
    }

    DomainValidator.str_is_not_empty(this.get('name'));
    DomainValidator.str_is_not_empty(this.get('password'));
    DomainValidator.str_validate_length(this.get('name'), 100);
    DomainValidator.str_validate_length(this.get('email'), 255);
  }

  /**
   * Ativa o engenheiro.
   */
  activate(): void {
    this.props.active = true;
  }

  /**
   * Desativa o engenheiro.
   */
  deactivate(): void {
    this.props.active = false;
  }
}

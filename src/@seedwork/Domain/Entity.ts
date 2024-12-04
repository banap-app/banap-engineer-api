import Identifier from "./Identifier.js";

export default abstract class Entity<T extends Identifier> {

    private id: T;

    protected constructor(id: T) {
        this.id = id;
    }

    public get_id(): T {
        return this.id;
    }

    /**
     * Obtém o valor de uma propriedade da entidade.
     * @param propName - O nome da propriedade.
     * @returns O valor da propriedade.
     */
    public get(propName: string): any {
        return (this as any)[propName];
    }

    /**
     * Define o valor de uma propriedade da entidade.
     * @param propName - O nome da propriedade.
     * @param value - O valor a ser atribuído à propriedade.
     */
    public set(propName: string, value: any): void {
        (this as any)[propName] = value;
    }

    to_dict(): object {
        const properties = Object.getOwnPropertyNames(this);
        const dict: { [key: string]: any } = {};

        properties.forEach(property => {
            dict[property] = (this as any)[property];
        });

        return dict;
    }
}

import Identifier from "../../@seedwork/Domain/Identifier.js";
import {v4 as UUID} from 'uuid'

export default class EngineerID extends Identifier {
    private value: string;

    public getValue(): string {
        return this.value
    }
    
    private constructor(value: string) {
        super()
        this.value = value;
    }

    public static unique(): EngineerID {
        return new EngineerID(UUID());
    }

    public static fromString(value: string): EngineerID {
        return new EngineerID(value);
    }


}
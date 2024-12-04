import ValueObject from "./ValueObject.js";

export default abstract class Identifier extends ValueObject{
    public abstract getValue(): string
}
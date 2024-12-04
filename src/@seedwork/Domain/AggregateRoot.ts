import Entity from "./Entity.js";
import Identifier from "./Identifier.js";

export default abstract class AggregateRoot<ID extends Identifier> extends Entity<ID> {

    protected constructor(id: ID) {
        super(id)
    }
}
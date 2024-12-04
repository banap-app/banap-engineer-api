
export default class GetEngineerOutput {
    success: boolean;
    message: string;
    id: string | null;
    name: string | null;
    email: string | null;
    active: boolean | null;
    created_at: string | null;
    crea: number | null;

    constructor(
        success: boolean, 
        message: string, 
        id: string | null,  
        name: string | null,  
        email: string | null, 
        active: boolean | null,  
        created_at: string | null,  
        crea: number | null
    ) {
        this.success = success;
        this.message = message;
        this.id = id  
        this.name = name;
        this.email = email;
        this.active = active;
        this.created_at = created_at;
        this.crea = crea
    }
}

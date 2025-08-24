export class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    
    public get username() : string {
        return this.name;
    }

    
    public set newName(name : string) {
        this.name = name;
    }
}
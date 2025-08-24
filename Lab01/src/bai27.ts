import { Person } from "./bai1";
export class Teacher extends Person {
    subject: string;
    constructor(name: string, age: number, subject: string) {
        super(name, age);
        this.subject = subject;
    }

    public introduce() {
        return `Hello, my name is ${this.name} and I teach ${this.subject}.`;
    }
}
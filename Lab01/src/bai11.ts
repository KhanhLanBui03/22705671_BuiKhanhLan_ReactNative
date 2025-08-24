class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class Dog extends Animal {
    public bark() {
        return 'bark';
    }
}

export class Cat extends Animal {

    public meow() {
        return 'meow';
    }
}
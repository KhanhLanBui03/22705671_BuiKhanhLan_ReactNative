export class Animal {
    protected makeSound(): string {
        return "Animal sound";
    }
}

export class Dog extends Animal {
    protected makeSound(): string {
        return "Gau!";
    }
}

export class Cat extends Animal {
    protected makeSound(): string {
        return "Meo";
    }
}
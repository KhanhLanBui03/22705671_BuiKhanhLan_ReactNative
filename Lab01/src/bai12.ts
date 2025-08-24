interface Flyable {
    fly(): string;
}

interface Swimmable {
    swim(): string;
}

export class Bird implements Flyable {
    fly(): string {
        return ('Most of birds can fly.');
        
    }
}

export class Fish implements Swimmable {
    swim(): string {
        return ('Fish can swim.');
    }

}
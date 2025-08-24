export class Animal {
    sound(): void {
        console.log("Animal sound");
    }
}
export class Elephant extends Animal {
    sound(): void {
        console.log("Elephant sound");
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elephant = exports.Animal = void 0;
class Animal {
    sound() {
        console.log("Animal sound");
    }
}
exports.Animal = Animal;
class Elephant extends Animal {
    sound() {
        console.log("Elephant sound");
    }
}
exports.Elephant = Elephant;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = exports.Dog = exports.Animal = void 0;
class Animal {
    makeSound() {
        return "Animal sound";
    }
}
exports.Animal = Animal;
class Dog extends Animal {
    makeSound() {
        return "Gau!";
    }
}
exports.Dog = Dog;
class Cat extends Animal {
    makeSound() {
        return "Meo";
    }
}
exports.Cat = Cat;

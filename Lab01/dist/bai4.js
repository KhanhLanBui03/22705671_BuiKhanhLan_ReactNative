"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    calc_area() {
        return this.width * this.height;
    }
    calc_perimeter() {
        return (this.width + this.height) * 2;
    }
}
exports.Rectangle = Rectangle;

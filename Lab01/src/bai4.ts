export class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }


    public calc_area() {
        return this.width * this.height;
    }

    public calc_perimeter() {
        return (this.width + this.height) * 2;
    }
}
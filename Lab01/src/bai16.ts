export class Box<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    get boxValue(): T {
        return this.value;
    }
}
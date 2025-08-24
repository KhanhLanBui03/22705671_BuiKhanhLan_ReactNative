"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
class Repository {
    constructor(value) {
        this.value = value;
    }
    getAll() {
        return this.value;
    }
    add(value) {
        this.value.push(value);
    }
}
exports.Repository = Repository;

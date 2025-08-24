"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name) {
        this.name = name;
    }
    get username() {
        return this.name;
    }
    set newName(name) {
        this.name = name;
    }
}
exports.User = User;

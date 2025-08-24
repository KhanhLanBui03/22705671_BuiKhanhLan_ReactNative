"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = exports.Manager = void 0;
class Employee {
}
class Manager extends Employee {
    do() {
        return 'Manager is working.';
    }
}
exports.Manager = Manager;
class Developer extends Employee {
    do() {
        return 'Developer is coding.';
    }
}
exports.Developer = Developer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor() {
        this.logs = [];
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(message) {
        this.logs.push(message);
        console.log(`Log: ${message}`);
    }
    getLogs() {
        return this.logs;
    }
}
exports.Logger = Logger;

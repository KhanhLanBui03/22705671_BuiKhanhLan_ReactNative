"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bai6_1 = require("./bai6");
async function batchProcess() {
    const tasks = [
        (0, bai6_1.simulateTask)(1000),
        (0, bai6_1.simulateTask)(2000),
        (0, bai6_1.simulateTask)(1500),
        (0, bai6_1.simulateTask)(500),
        (0, bai6_1.simulateTask)(1200),
    ];
    const results = await Promise.all(tasks);
    console.log("Batch results:", results);
}
batchProcess();

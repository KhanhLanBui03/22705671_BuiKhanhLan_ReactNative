"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateTask = simulateTask;
function simulateTask(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task done after ${time} ms`);
        }, time);
    });
}
Promise.all([simulateTask(1000), simulateTask(1500), simulateTask(2000)]).then((result) => {
    console.log("All result:", result);
});

"use strict";
function simulateTask11(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Task done after ${time} ms`), time);
    });
}
async function runTask1() {
    const result = await simulateTask11(1000);
    console.log(result);
}
runTask1();

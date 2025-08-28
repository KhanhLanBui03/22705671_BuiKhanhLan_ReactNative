"use strict";
async function queueProcess() {
    const tasks = [1000, 2000, 1500, 500, 1200];
    for (let i = 0; i < tasks.length; i++) {
        await new Promise((resolve) => setTimeout(() => {
            console.log(`Task ${i + 1} done`);
            resolve(true);
        }, tasks[i]));
    }
}
queueProcess();

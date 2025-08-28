"use strict";
async function multiplee(n) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(n * 3), 1000);
    });
}
async function runForAwait() {
    const promises = [multiplee(2), multiplee(3), multiplee(4)];
    for await (const result of promises) {
        console.log(result);
    }
}
runForAwait();

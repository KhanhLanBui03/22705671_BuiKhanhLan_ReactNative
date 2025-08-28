"use strict";
async function multiply(n) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(n * 3), 1000);
    });
}
multiply(4).then(res => console.log("Result:", res));

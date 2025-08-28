"use strict";
function simulateTask1(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task done after ${time} ms`);
        }, time);
    });
}
simulateTask1(2000).then((result) => {
    console.log(result);
});

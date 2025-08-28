"use strict";
function processNumber(num) {
    return Promise.resolve(num)
        .then((n) => n * n)
        .then((n) => n * 2)
        .then((n) => n + 5);
}
processNumber(2).then((result) => {
    console.log("Process number:", result);
});

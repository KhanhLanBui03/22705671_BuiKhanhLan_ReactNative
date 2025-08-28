"use strict";
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 1000);
});
promise.then((message) => {
    console.log(`${message}`);
}, (error) => {
    console.log(`${error}`);
});

"use strict";
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
myPromise.then((message) => {
    console.log(`${message}`);
}, (error) => {
    console.log(`${error}`);
});

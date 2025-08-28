"use strict";
const promise4 = new Promise((resolve, reject) => {
    const num = Math.floor(Math.random() * 100);
    resolve(num);
});
promise4.then((message) => {
    console.log(`Number random :${message}`);
});
promise4.catch((error) => {
    console.log(`Number random :${error}`);
});

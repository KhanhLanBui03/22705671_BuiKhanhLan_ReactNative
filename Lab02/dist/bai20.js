"use strict";
function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms))
    ]);
}
function fakeApiCall() {
    return new Promise((resolve) => setTimeout(() => resolve("API response OK"), 3000));
}
withTimeout(fakeApiCall(), 2000)
    .then((res) => console.log(res))
    .catch((err) => console.error("Error:", err.message));

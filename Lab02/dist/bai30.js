"use strict";
async function fetchData(link) {
    const response = await fetch(link);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
async function fetchMultipleURLs(urls) {
    const promises = urls.map(url => fetchData(url));
    const results = await Promise.allSettled(promises);
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Success [${urls[index]}]:`, result.value);
        }
        else {
            console.error(`Failed [${urls[index]}]:`, result.reason);
        }
    });
}
const urls = [
    "https://jsonplaceholder.typicode.com/todos/1",
    "https://jsonplaceholder.typicode.com/todos/2",
    "https://jsonplaceholder.typicode.com/invalid" // lỗi
];
fetchMultipleURLs(urls);

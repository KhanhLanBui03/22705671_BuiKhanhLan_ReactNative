"use strict";
async function downloadFile(file) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Downloading file:", file);
            resolve("Done");
        }, 3000);
    });
}
downloadFile("abc.pdf");

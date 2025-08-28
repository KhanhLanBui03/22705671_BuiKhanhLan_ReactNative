"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: `User${id}` }), 1000);
    });
}
fetchUser(2).then((res) => console.log("Result:", res));
exports.default = fetchUser;

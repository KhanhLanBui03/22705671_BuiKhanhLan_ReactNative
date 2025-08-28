"use strict";
function fetchUser1(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: `User${id}` }), 1000);
    });
}
async function fetchUsers(ids) {
    const users = [];
    for (const id of ids) {
        const user = await fetchUser1(id);
        users.push(user);
    }
    return users;
}
fetchUsers([1, 2, 3]).then(console.log);

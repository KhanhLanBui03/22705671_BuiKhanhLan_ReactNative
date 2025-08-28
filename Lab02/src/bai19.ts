function fetchUser1(id: number): Promise<{ id: number; name: string }> {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: `User${id}` }), 1000);
    });
}
async function fetchUsers(ids: number[]) {
  const users = [];
  for (const id of ids) {
    const user = await fetchUser1(id);
    users.push(user);
  }
  return users;
}

fetchUsers([1, 2, 3]).then(console.log);

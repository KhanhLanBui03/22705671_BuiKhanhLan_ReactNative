
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: `User${id}` }), 1000);
    });
}
fetchUser(2).then((res)=>console.log("Result:",res))

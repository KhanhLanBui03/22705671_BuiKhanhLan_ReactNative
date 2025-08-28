async function multiple(n: number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(n * 3), 1000);
    });
}

async function runParallel() {
    const results = await Promise.all([
        multiple(2),
        multiple(3),
        multiple(4),
    ]);
    console.log(results);
}
runParallel();

async function multiply(n: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(n * 3), 1000);
  });
}
multiply(4).then(res => console.log("Result:",res))


async function multiplyy(n: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(n * 3), 1000);
  });
}
async function runSequential() {
  const a = await multiplyy(2);
  console.log("a:", a);
  const b = await multiplyy(3);
  console.log("b:", b);
  const c = await multiplyy(4);
  console.log("c:", c);
}

runSequential();

function simulateTask12(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task done after ${time} ms`), time);
  });
}
async function runTask2() {
  const result = await simulateTask12(2000);
  console.log(result);
}
runTask2();

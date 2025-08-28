function simulateTask11(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Task done after ${time} ms`), time);
  });
}
async function runTask1() {
  const result = await simulateTask11(1000);
  console.log(result);
}
runTask1();

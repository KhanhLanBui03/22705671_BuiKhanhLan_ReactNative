function simulateTask13(time: number, succeed = true): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      succeed ? resolve("Task success") : reject("Task failed");
    }, time);
  });
}
async function runTask3() {
  try {
    const result = await simulateTask13(1500, false);
    console.log(result);
  } catch (err) {
    console.log("Error:", err);
  } finally {
    console.log("Done");
  }
}

runTask3();

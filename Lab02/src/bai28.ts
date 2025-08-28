import {simulateTask} from "./bai6"

async function batchProcess() {
  const tasks = [
    simulateTask( 1000),
    simulateTask( 2000),
    simulateTask( 1500),
    simulateTask( 500),
    simulateTask( 1200),
  ];
  const results = await Promise.all(tasks);
  console.log("Batch results:", results);
}

batchProcess();

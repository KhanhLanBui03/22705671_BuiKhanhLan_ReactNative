const promise10 = new Promise<string>((resolve, reject) => {
  const success = true; 
  if (success) {
    resolve("Task success");
  } else {
    reject("Task failed");
  }
});

promise10
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("Done"));

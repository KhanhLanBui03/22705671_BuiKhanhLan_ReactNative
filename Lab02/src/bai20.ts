function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    )
  ]);
}
function fakeApiCall(): Promise<string> {
  return new Promise((resolve) =>
    setTimeout(() => resolve("API response OK"), 3000)
  );
}

withTimeout(fakeApiCall(), 2000)
  .then((res) => console.log(res))
  .catch((err) => console.error("Error:", err.message));

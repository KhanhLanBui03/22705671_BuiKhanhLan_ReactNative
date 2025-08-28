async function fetchWithRetry(url: string, retries: number): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("HTTP error " + res.status);
            return await res.json();
        } catch (err) {
            console.warn(`Attempt ${i + 1} failed. Retrying...`);
            if (i === retries - 1) throw err;
        }
    }
}
fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3)
    .then((data) => console.log("Fetched with retry:", data))
    .catch((err) => console.error("Failed:", err));

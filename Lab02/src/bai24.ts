async function postData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "My Post",
      body: "This is a test",
      userId: 1,
    }),
  });

  const data = await res.json();
  console.log("Post response:", data);
}

postData();

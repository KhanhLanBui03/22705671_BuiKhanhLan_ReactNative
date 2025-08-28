async function getCompletedTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  const completed = todos.filter((t: any) => t.completed);
  console.log("Completed todos:", completed);
}

getCompletedTodos();

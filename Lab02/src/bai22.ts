async function getMultipleTodos(){
    for(var i=1;i<=4;i++){
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${i}`);
        const data = await res.json();
        console.log(`Todo ${i}:`, data);
    }

}
getMultipleTodos();
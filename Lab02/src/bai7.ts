function simulateTask2(time:number):Promise<string>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(`Task done after ${time} ms`)
        },time)
    })
} 
Promise.race([simulateTask2(1000),simulateTask2(1500),simulateTask2(2000)]).then((result)=>{
    console.log("simulateTask first", result);
})
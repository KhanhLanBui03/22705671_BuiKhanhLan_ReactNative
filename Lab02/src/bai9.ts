function arrayNumber() : Promise<number[]> {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const arr = [1,2,3,4,5,6];
            resolve(arr.filter((n)=>n%2===0))
        },1000)
    })
}
arrayNumber().then((arr)=>{
    console.log("Array:",arr)
})
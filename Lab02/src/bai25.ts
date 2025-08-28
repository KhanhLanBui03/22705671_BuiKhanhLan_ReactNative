async function downloadFile(file: string){
    
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Downloading file:",file)
            resolve("Done");
        },3000)
    })
}
downloadFile("abc.pdf")
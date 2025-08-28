async function  wait5Seconds() {
    console.log("Waiting 5 seconds!");
    await new Promise((resolve) => setTimeout(resolve,5000))
    console.log("Done!")
    
}
wait5Seconds()
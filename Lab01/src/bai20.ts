export interface Vehicle {
    start(): void;
    stop(): void;
}
export class Carr implements Vehicle {
    start(): void {
        console.log("Car is starting");
    }
    stop(): void {
        console.log("Car is stopping");
    }
}
export class Bike implements Vehicle {
    start(): void {
        console.log("Bike is starting");
    }
    stop(): void {
        console.log("Bike is stopping");
    }
}
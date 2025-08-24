class Employee {

}

export class Manager extends Employee {
  
    public do(): string {
        return 'Manager is working.'
    }
}

export class Developer extends Employee {
    
    public do(): string {
        return 'Developer is coding.'
    }
}
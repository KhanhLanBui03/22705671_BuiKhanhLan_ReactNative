export class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    
    public deposit(amount: number) {
        this.balance += amount;
    }

   
    public withdraw(amount: number) {
        this.balance -= amount;
    }
}
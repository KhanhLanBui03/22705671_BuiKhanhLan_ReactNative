export interface Payment {
    pay(amount: number): void;
}
export class CashPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid ${amount} using cash.`);
    }
}
export class CardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Paid ${amount} using card.`);
    }
}
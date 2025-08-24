export class Stack {
    private items: any[] = [];

    push(item: any) {
        this.items.push(item);
    }

    pop(): any {
        return this.items.pop();
    }

    peek(): any {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}
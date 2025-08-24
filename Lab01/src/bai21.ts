export class Repository<G> {
    value: G[];

    constructor(value: G[]) {
        this.value = value;
    }
    getAll(): G[] {
        return this.value;
    }
    add(value: G): void {
        this.value.push(value);
    }
}
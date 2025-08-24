import { Product } from "./bai8";

export class Order {
    products: Product[];
    constructor(products: Product[]) {
        this.products = products;
    }
    public calcTotalPrice() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}
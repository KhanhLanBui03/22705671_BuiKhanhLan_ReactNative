"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
class Order {
    constructor(products) {
        this.products = products;
    }
    calcTotalPrice() {
        return this.products.reduce((total, product) => total + product.price, 0);
    }
}
exports.Order = Order;

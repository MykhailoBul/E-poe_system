class Product {
    constructor(id, title, price,category) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.category = category;
    }
    describe() {
        return `${this.title} (${this.category}): $${this.price}`;
    }
    static discountedPrice(price, discount) {
        return price - (price * discount / 100);
    }
}

const laptop = new Product(1, 'Sülearvuti', 999.99, 'Elektroonika');
console.log(laptop.describe());
console.log(Product.discountedPrice(laptop.price, 10)); 

class Cart {
    constructor() {
        this.items = [];
    }

    addProduct(product, quantity) {
        this.items.push({ product, quantity });
    }
    removeProduct(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }
    calculateTotal() {
        return this.items.reduce((total, item) =>
            total + item.product.price * item.quantity, 0);
    }
    get totalItems() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
}

const cart = new Cart();
cart.addProduct(laptop, 2);
console.log(cart.calculateTotal());
console.log(cart.totalItems); 

class Order {
    constructor(cart) {
        this.orderDate = new Date();
        this.cart = cart;
    }
    printOrder() {
        console.log(`Order Date: ${this.orderDate}`);
        console.log(`Total Items: ${this.cart.totalItems}`);
        console.log(`Total Price: $${this.cart.calculateTotal().toFixed(2)}`);
    }
}

const order = new Order(cart);
order.printOrder()

class Customer {
    constructor(name) {
        this.name = name;
        this.orderHistory = [];
    }
    placeOrder(cart) {
        const order = new Order(cart);
        this.orderHistory.push(order);
        return order;
    }
    printOrderHistory(){
        console.log(`Order History for ${this.name}:`);
        this.orderHistory.forEach((order, index) => {
            console.log(`Order ${index + 1}:`);
            order.printOrder();
        });
        if (this.orderHistory.length === 0) {
            console.log("Tellimusi ei ole.");
            return;
        }
    }
}
const customer = new Customer('Alice');
customer.placeOrder(cart);
customer.printOrderHistory();
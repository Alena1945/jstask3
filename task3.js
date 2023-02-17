const good = [
{
    id: 1,             
    name: "iPhone",
    description: "color: white",
    sizes: "12 pro max",
    price: "120000",
    available: true,
},
{
    id: 2,             
    name: "MacBook",
    description: "color: silver",
    sizes: "Pro 16",
    price: "250000",
    available: true,
},
{
    id: 3,             
    name: "iPad",
    description: "color: pink",
    sizes: "Air",
    price: "51000",
    available: true,
},
{
    id: 4,             
    name: "iMac",
    description: "color: blue",
    sizes: "24",
    price: "147000",
    available: true,
},
{   id: 5,             
    name: "Apple Watch",
    description: "color: black",
    sizes: "Ultra 49mm",
    price: "34000",
    available: true,
}
]

class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable(status) {
        this.available = status;
    }
}

class GoodList {
    #goods
    constructor(filter, sortPrice, sortDir) {
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list() {
        const listSaleProduct = this.#goods.filter(good => this.filter.test(good.name));

        if (!this.sortPrice) {
            return listSaleProduct;
        }

        if (this.sortDir) {
            return listSaleProduct.sort((a, b) => (a.price - b.price));
        }
        return listSaleProduct.sort((a, b) => (b.price - a.price));
    }

    add(newGood) {
        this.#goods.push(newGood);
    }

    remove(id) {
        const getIndex = this.#goods.findIndex(good => good.id === id);
        if (getIndex != undefined) {
            this.#goods.splice(getIndex, 1);
        }
        return getIndex;
    }
}

class BasketGoods extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = []
    }
    get totalAmount() {
        return this.goods.map(item => item.amount).reduce((a, b) => a + b, 0);
    }

    get totalSum() {
        return this.goods.reduce((a, b) => a + b.amount * b.price, 0);
    }

    add(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            this.goods[index].amount += amount;
        } else {
            let addGood = new BasketGoods(good.id, good.name, good.description, good.sizes, good.price, good.available, amount);
            this.goods.push(addGood);
        }
    }

    remove(good, amount) {
        let index = this.goods.findIndex(value => value.id === good.id);
        if (index >= 0) {
            if (this.goods[index].amount - amount <= 0 || amount === 0) {
                this.goods.splice(index, 1);
            } else {
                this.goods[index].amount -= amount;
            }
        }
    }

    clear () {
        this.goods.length = 0;
    }

    removeUnavailable() {
        this.goods.filter(item => item.available === false).forEach(value => this.remove(value));
    }
}

// second.setAvailable(false);

// console.log(second)

const catalog = new GoodsList(/iMac/i, true, false);

catalog.add(first);
catalog.add(second);
catalog.add(third);
catalog.add(fourth);
catalog.add(fifth);

// console.log(`Selected goods from catalog: `, catalog.list);

catalog.sortPrice = true;
catalog.sortDir = false;

// console.log(`Sorted by price in descending order: `, catalog.list);

catalog.remove(4);
// console.log(`Removing item from catalog:`, catalog.list);

const basket = new Basket();

basket.add(first, 1);
basket.add(second, 2);
basket.add(third, 3);
basket.add(fourth, 4);
basket.add(fifth, 5);

console.log(`Total items in shopping cart: ${basket.totalAmount}`);
console.log(`Total sum for ${basket.totalAmount} items in a cart is: $${basket.totalSum}`);

basket.remove(second, 1);
basket.remove(third, 2);

// console.log(basket.goods)

basket.removeUnavailable();

// console.log(basket.goods)

basket.clear();

// console.log(basket.goods)
// Product Catalog - Product Name: Product Price
const productPrices = { A: 20, B: 40, C: 50 };

// User Inputs
const quantities = {};
const giftWrappers = {};

for (const product in productPrices) {
    quantities[product] = parseInt(prompt(How many Quantity of "Product ${product}" would you like?));
    giftWrappers[product] = parseInt(prompt(How many "Product ${product}" with Gift Wrappers would you like?));
}

// Bill
const separatorLine = "_____________";

// Display Table
console.log("Product Name - Quantity - Total Amount");
console.log(separatorLine);

let totalAmount = 0;
for (const [product, price] of Object.entries(productPrices)) {
    const quantity = quantities[product];
    const totalProductAmount = quantity * price;
    console.log(Product ${product} - ${quantity} - $${totalProductAmount});
    totalAmount += totalProductAmount;
}

// Subtotal
console.log(separatorLine);
console.log("Total : $", totalAmount);

// Discounts
const discounts = {};

if (totalAmount > 200) {
    discounts.flat_10_discount = 10;
}

for (const product in productPrices) {
    if (quantities[product] > 10) {
        discounts.bulk_5_discount = Object.values(productPrices).reduce((acc, curr) => acc + 0.05 * (quantities[product] * curr), 0);
    }
}

if (Object.values(quantities).reduce((acc, curr) => acc + curr) > 20) {
    discounts.bulk_10_discount = 0.1 * totalAmount;
}

if (Object.values(quantities).reduce((acc, curr) => acc + curr) > 30) {
    discounts.tiered_50_discount = Object.entries(productPrices).reduce((acc, [product, price]) => {
        if (quantities[product] > 15) {
            return acc + 0.5 * ((quantities[product] - 15) * price);
        }
        return acc;
    }, 0);
}

// Apply Beneficial Discount
const maxDiscount = Math.max(...Object.values(discounts));
const discountName = Object.keys(discounts).find(key => discounts[key] === maxDiscount);

console.log(separatorLine);
console.log("Discount Applied :", discountName);
console.log("Discount Amount : $", maxDiscount);

// Calculate Shipping Fee
const shippingItems = Object.values(quantities).reduce((acc, curr) => acc + curr);
const shippingFee = Math.floor((shippingItems / 10) * 5);
console.log('Shipping Fee : $', shippingFee);

// Calculate Gift Wrapper Fee
const giftWrapperFee = Object.values(giftWrappers).reduce((acc, curr) => acc + curr);
console.log('Gift Wrapper Fee: $', giftWrapperFee);

// Calculate Total Cost
const totalCost = totalAmount - maxDiscount + shippingFee + giftWrapperFee;
console.log(separatorLine);
console.log("Total : $", totalCost);
console.log(separatorLine);
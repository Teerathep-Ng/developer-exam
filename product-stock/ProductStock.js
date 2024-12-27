// Test ProductStock.ts file
// This page from `npm install -g typescript`
// Check `tsc -v`
// Run using node ProductStock.js
// ************************ DON'T FORGET COMMENT OUT BELOW BEFORE RUN THIS FILE ************************ 

// var InventoryManager = /** @class */ (function () {
//     function InventoryManager(initialProducts) {
//         this.products = [];
//         this.discountRules = {
//             'A': 0.05,
//             'B': 0.03,
//             'C': 0.01
//         };
//         this.taxRate = 0.08;
//         this.products = initialProducts;
//     }
//     InventoryManager.prototype.addProduct = function (product) {
//         // Bug: ไม่ตรวจสอบว่าสินค้าซ้ำกันหรือไม่
//         var existProduct = this.products.find(function (p) { return p.id === product.id || p.name === product.name; });
//         if (existProduct) {
//             throw new Error("Product with ID ".concat(product.id, " or Name ").concat(product.name, " already exist"));
//         }
//         this.products.push(product);
//     };
//     InventoryManager.prototype.updateStock = function (productId, newQuantity) {
//         // Debug: Add condition of newQuantity is integer more than zero
//         if (!Number.isInteger(newQuantity) || newQuantity <= 0) {
//             throw new Error("Quantity must be Positive Interger");
//         }
//         var productIndex = this.products.findIndex(function (p) { return p.id === productId; });
//         if (productIndex !== -1) {
//             // Bug: ไม่ตรวจสอบว่า newQuantity เป็นจำนวนเต็มบวกหรือไม่
//             this.products[productIndex].stockQuantity = newQuantity;
//         }
//     };
//     InventoryManager.prototype.calculateRevenue = function (soldQuantity, productId) {
//         var product = this.getProductById(productId);
//         if (!product)
//             return 0;
//         // Debug check soldQuantity and stockQuantity
//         if (product && soldQuantity > product.stockQuantity) {
//             throw new Error("Cannot sell ".concat(soldQuantity, " items. Only ").concat(product.stockQuantity, " items"));
//         }
//         var discountedPrice = product.sellingPrice * (1 - this.getDiscount(product.category));
//         var taxAmount = discountedPrice * soldQuantity * this.taxRate;
//         var revenue = discountedPrice * soldQuantity + taxAmount;
//         // Bug: ไม่ตรวจสอบว่า soldQuantity เกิน stockQuantity หรือไม่
//         return revenue;
//     };
//     InventoryManager.prototype.calculateProfit = function (soldQuantity, productId) {
//         var product = this.getProductById(productId);
//         if (!product)
//             return 0;
//         var discountedPrice = product.sellingPrice * (1 - this.getDiscount(product.category));
//         var cost = product.costPrice * soldQuantity;
//         var profit = discountedPrice * soldQuantity - cost;
//         // Debug: Calculate tax and netProfit
//         var tax = profit * this.taxRate;
//         var netProfit = profit - tax;
//         return netProfit;
//         // Bug: ไม่คำนวณภาษีในการคำนวณกำไร
//         // return profit;
//     };
//     InventoryManager.prototype.getProductById = function (id) {
//         return this.products.find(function (p) { return p.id === id; });
//     };
//     InventoryManager.prototype.getDiscount = function (category) {
//         return this.discountRules[category] || 0;
//     };
//     InventoryManager.prototype.restock = function (productId, additionalQuantity) {
//         // Debug: Add condition of additionalQuantity is integer more than zero
//         if (!Number.isInteger(additionalQuantity) || additionalQuantity <= 0) {
//             throw new Error("additionalQuantity must be Positive Interger");
//         }
//         var productIndex = this.products.findIndex(function (p) { return p.id === productId; });
//         if (productIndex !== -1) {
//             // Bug: ไม่ตรวจสอบว่า additionalQuantity เป็นจำนวนเต็มบวกหรือไม่
//             this.products[productIndex].stockQuantity += additionalQuantity;
//         }
//     };
//     InventoryManager.prototype.getLowStockProducts = function (threshold) {
//         return this.products.filter(function (p) { return p.stockQuantity <= threshold; });
//     };
//     return InventoryManager;
// }());
// // Usage example
// var inventory = new InventoryManager([
//     { id: 'P001', name: 'Laptop', costPrice: 800, sellingPrice: 1200, stockQuantity: 50, category: 'A' },
//     { id: 'P002', name: 'Smartphone', costPrice: 300, sellingPrice: 600, stockQuantity: 100, category: 'B' },
// ]);

// inventory.addProduct({ id: 'P003', name: 'Tablet', costPrice: 250, sellingPrice: 400, stockQuantity: 75, category: 'C' });

// console.log(inventory.calculateRevenue(5, 'P001'));
// console.log(inventory.calculateProfit(5, 'P001'));

// inventory.updateStock('P001', 40);
// console.log(inventory.getLowStockProducts(50));

// inventory.restock('P002', 20);
// console.log(inventory.getLowStockProducts(80));

// inventory.restock('P002', 20);
// console.log(inventory.getLowStockProducts(140));

// inventory.addProduct({ id: 'P003', name: 'b', costPrice: 250, sellingPrice: 400, stockQuantity: 75, category: 'C' });


interface Product {
  id: string;
  name: string;
  price: number;
  }


interface CartItem extends Product {
  quantity: number;
}

class ShoppingCart {
  private items: CartItem[] = [];
  private taxRate: number = 0.07;

  // ทำการเพิ่มขั้นต่ำของ quantity = 1 เพื่อป้องกันในกร
  public addItem(item: Product, quantity: number = 1): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a positive integer");
    }
    
    const existingItemIndex = this.items.findIndex(i => i.id === item.id);
    if (existingItemIndex !== -1) {
      this.items[existingItemIndex].quantity += quantity;
    } else {
      this.items.push({ ...item, quantity });
    }
  }

  public removeItem(itemId: string): void {
    const existItem = this.items.findIndex(i => i.id === itemId);
    if (existItem === -1) {
      throw new Error(`Item id ${itemId} doesn't exist`);
    }
    this.items = this.items.filter(item => item.id !== itemId);
  }

  public calculateSubtotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  public calculateTax(subtotal: number): number {
    return subtotal * this.taxRate;
  }

  public calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const tax = this.calculateTax(subtotal);
    
    return Math.floor((subtotal + tax) * 100) / 100;
  }

  public getCartSummary(): string {
    const subtotal = this.calculateSubtotal();
    const tax = this.calculateTax(subtotal);
    const total = this.calculateTotal();
    
    return `Subtotal: $${subtotal.toFixed(2)}, Tax: $${tax.toFixed(2)}, Total: $${total.toFixed(2)}`;
  }

  public applyDiscount(discountPercentage: number): void {
    if (discountPercentage <= 0 || discountPercentage > 100) {
      throw new Error("Invalid discount percentage");
    }
    this.items.forEach(item => {
      item.price *= (1 - discountPercentage / 100);
    });
  }
}

// Usage example
const cart = new ShoppingCart();

// Description
// Bug: Output node `ShoppingCart.js` is `Subtotal: $NaN, Tax: $NaN, Total: $NaN` 
// Because addItem function must be receive 2 arguments, But we give input of addItem has only 1. like these below.

// cart.addItem({ id: '1', name: 'Laptop', price: 999.99, quantity: 1 });
// cart.addItem({ id: '2', name: 'T-Shirt', price: 19.99, quantity: 2 });

// เมื่อทำการคำนวณด้วย 1 อาร์กิวเม้น จาก 2 อาร์กิวเม้น จะได้ค่าของ f(x, undefined) = NaN และเมื่อนำไปคำนวณค่าต่อก็จะได้ NaN จึงทำการแก้โดยใส่ค่าให้ถูกและครบอากิวเม้น

// Debug is Here... give 2 input within addItem function. And don't forget 2nd argument isn't object!! 
cart.addItem({ id: '1', name: 'Laptop', price: 999.99}, 1 );
console.log(cart.getCartSummary());

cart.addItem({ id: '2', name: 'T-Shirt', price: 19.99}, 2 );
console.log(cart.getCartSummary());

cart.applyDiscount(10); // Apply 10% discount
console.log(cart.getCartSummary());

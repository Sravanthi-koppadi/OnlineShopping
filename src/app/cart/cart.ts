import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../cartservice';
import { ProductService } from '../productservice';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {
  public cartService = inject(CartService);
  private productService = inject(ProductService);

  // Map cart items to include full product details (Updated for Numeric IDs)
  cartDetails = computed(() => {
    return this.cartService.cart().map(item => {
      // Ensure the ID is treated as a number
      const product = this.productService.getProductById(Number(item.productId));
      return {
        ...item,
        details: product
      };
    });
  });

  // Calculate subtotal based on new numeric price field
  subtotal = computed(() => {
    return this.cartDetails().reduce((sum, item) => {
      const price = item.details?.price || 0;
      return sum + (price * item.quantity);
    }, 0);
  });

  handleCheckout() {
    if (this.cartDetails().length === 0) return;
    
    // Using a more modern feedback approach
    const total = this.subtotal().toFixed(2);
    alert(`Success! Your order of $${total} has been placed. ShopVault is preparing your luxury items.`);
    
    // Clear the cart via the service
    this.cartService.clearCart(); 
  }
}
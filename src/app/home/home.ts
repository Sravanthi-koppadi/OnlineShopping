import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../productservice';
import { CartService } from '../cartservice';
import { AuthService } from '../authservice';
import { Product } from '../productservice';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  // State for filtering
  selectedCategory = signal<string>('All');
  categories = this.productService.categories;

  // Computed signal for filtered products based on category
  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const products = this.productService.allProducts();
    if (category === 'All') return products;
    return products.filter(p => p.category === category);
  });
  constructor(private router:Router){}

  setCategory(category: string) {
    this.selectedCategory.set(category);
    
  }

 // 1. Add this signal to your class properties
addedProductId = signal<number | null>(null);

onAddToCart(product: Product) {
  if (!this.authService.currentUser()) {
    alert('Please Login to add items to your cart!');
    return;
  }
  
  // Existing logic
  this.cartService.addToCart(product.id);

  // --- New Feedback Logic ---
  this.addedProductId.set(product.id);
  
  // Reset after 2 seconds so the user can see the "Added" state
  
}
}
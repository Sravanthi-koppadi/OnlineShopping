import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router'; // Added Router
import { Title } from '@angular/platform-browser';
import { ProductService, Product } from '../productservice';
import { CartService } from '../cartservice';
import { AuthService } from '../authservice'; // Ensure this path is correct

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productdetail.html',
  styleUrls: ['./productdetail.css']
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router); // New injection
  private productService = inject(ProductService);
  public cartService = inject(CartService);
  public authService = inject(AuthService); // New injection
  private titleService = inject(Title);

  product = signal<Product | undefined>(undefined);
  isAdded = signal(false);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const numericId = Number(idParam);
      const found = this.productService.getProductById(numericId);
      this.product.set(found);

      if (found) {
        this.titleService.setTitle(`${found.title} | ShopVault`);
      }
    }
  }

  // Merged Logic: Checks Auth, then Adds, then shows UI Feedback
  addToCart() {
    const currentProduct = this.product();
    
    if (!currentProduct) return;

    // 1. Security Check: If not logged in, redirect to login page
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: this.router.url } 
      });
      return;
    }

    // 2. Add to Service (User is authenticated)
    this.cartService.addToCart(currentProduct.id);
    
    // 3. UI Feedback logic
    this.isAdded.set(true); 
    console.log(`Successfully added ${currentProduct.title} to vault.`);

    // 4. Reset the button after 2 seconds
    setTimeout(() => {
      this.isAdded.set(false);
    }, 2000);
  }
}














// export class ProductDetailComponent implements OnInit {
//   private route = inject(ActivatedRoute);
//   private productService = inject(ProductService);
//   public cartService = inject(CartService);
//   private titleService = inject(Title);

//   // Signal to hold the current product being viewed
//   product = signal<Product | undefined>(undefined);

//   ngOnInit() {
//     // 1. Get the ID from the URL parameters
//     const idParam = this.route.snapshot.paramMap.get('id');
    
//     if (idParam) {
//       // 2. Convert string ID to Number to match our new ProductService data type
//       const numericId = Number(idParam);
//       const found = this.productService.getProductById(numericId);
      
//       this.product.set(found);

//       // 3. Update browser tab title for that "luxury" UX
//       if (found) {
//         this.titleService.setTitle(`${found.title} | ShopVault`);
//       }
//     }
//   }

//   isAdded = signal(false);

// addToCart() {
//   const currentProduct = this.product();
//   if (currentProduct) {
//     this.cartService.addToCart(currentProduct.id);
    
//     // --- New Logic Start ---
//     this.isAdded.set(true); 
//      // Resets after 2 seconds
//     // --- New Logic End ---

//     console.log(`Successfully added ${currentProduct.title} to vault.`);
//   }
// }
// }

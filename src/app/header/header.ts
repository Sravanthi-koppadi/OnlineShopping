import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../authservice';
import { CartService } from '../cartservice';
import { ProductService } from '../productservice';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  // Services
  public authService = inject(AuthService);
  public cartService = inject(CartService);
  private productService = inject(ProductService); // Injected for search logic
  private router = inject(Router);

  /**
   * Updates the global search signal in ProductService.
   * This will automatically update the 'filteredProducts' computed signal 
   * in your HomeComponent.
   */
  handleSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    
    // 1. Update the search signal in the service
    this.productService.searchQuery.set(query);

    // 2. UX: If the user searches while on the Cart or Detail page, 
    // we should redirect them back to Home to see the results.
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/home']); // Redirect to login for a "secure" feel
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
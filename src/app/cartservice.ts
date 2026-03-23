import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { AuthService } from './authservice';

export interface CartItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private auth = inject(AuthService); // Inject your existing AuthService
  
  // The master cart state (UNCHANGED)
  cart = signal<CartItem[]>([]);

  // Derived state (UNCHANGED)
  cartCount = computed(() => 
    this.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  constructor() {
    // AUTOMATION: This watches AuthService for Login/Logout
    effect(() => {
      const user = this.auth.currentUser();
      
      if (user) {
        // RESTORE: User logged in, load their specific cart from localStorage
        const saved = localStorage.getItem(`vault_cart_${user.username}`);
        this.cart.set(saved ? JSON.parse(saved) : []);
      } else {
        // WIPE: User logged out, clear the UI signal immediately
        // Note: This does NOT delete the data from localStorage, just hides it.
        this.cart.set([]);
      }
    });
  }

  // --- Internal Helper to Save Data ---
  private syncToVault() {
    const user = this.auth.currentUser();
    if (user) {
      localStorage.setItem(`vault_cart_${user.username}`, JSON.stringify(this.cart()));
    }
  }

  // --- Existed Methods (Modified ONLY to add the Save logic) ---

  addToCart(productId: number) {
    // Safety: If not logged in, don't allow adding (Optional)
    if (!this.auth.isAuthenticated()) return;

    const current = this.cart();
    const existing = current.find(i => i.productId === productId);

    if (existing) {
      this.updateQuantity(productId, existing.quantity + 1);
    } else {
      this.cart.set([...current, { productId, quantity: 1 }]);
      this.syncToVault(); // Save the change
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.cart.update(items => 
      items.map(item => item.productId === productId ? { ...item, quantity } : item)
    );
    this.syncToVault(); // Save the change
  }

  removeFromCart(productId: number) {
    this.cart.update(items => items.filter(i => i.productId !== productId));
    this.syncToVault(); // Save the change
  }

  clearCart() {
    this.cart.set([]);
    this.syncToVault(); // Save the empty state for this user
  }
}




// export class CartService {
//   // The master cart state
//   cart = signal<CartItem[]>([]);

//   // Derived state: Total items in cart
//   cartCount = computed(() => 
//     this.cart().reduce((sum, item) => sum + item.quantity, 0)
//   );

//   addToCart(productId: number) {
//     const current = this.cart();
//     const existing = current.find(i => i.productId === productId);

//     if (existing) {
//       this.updateQuantity(productId, existing.quantity + 1);
//     } else {
//       this.cart.set([...current, { productId, quantity: 1 }]);
//     }
//   }

//   updateQuantity(productId: number, quantity: number) {
//     if (quantity <= 0) {
//       this.removeFromCart(productId);
//       return;
//     }
//     this.cart.update(items => 
//       items.map(item => item.productId === productId ? { ...item, quantity } : item)
//     );
//   }

//   removeFromCart(productId: number) {
//     this.cart.update(items => items.filter(i => i.productId !== productId));
//   }

//   clearCart() {
//     this.cart.set([]);
//   }
// }
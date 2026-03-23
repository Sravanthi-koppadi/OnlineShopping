import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<{ username: string } | null>(null);
  isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    this.restoreSession();
  }

  private restoreSession() {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('sv_user');
      if (saved) {
        this.currentUser.set({ username: saved });
      }
    }
  }

  login(username: string): boolean {
    try {
      this.currentUser.set({ username });
      sessionStorage.setItem('sv_user', username);
      return true; 
    } catch (error) {
      console.error("Vault access denied:", error);
      return false;
    }
  }

  logout() {
    // This change triggers the CartService wipe automatically
    this.currentUser.set(null);
    sessionStorage.removeItem('sv_user');
  }

  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}



// export class AuthService {
//   // Reactive state for the logged-in user
//   currentUser = signal<{ username: string } | null>(null);

//   constructor() {
//     this.restoreSession();
//   }
//   isLoggedIn = computed(() => !!this.currentUser());

//   private restoreSession() {
//     if (typeof window !== 'undefined') {
//       const saved = sessionStorage.getItem('sv_user');
//       if (saved) {
//         this.currentUser.set({ username: saved });
//       }
//     }
//   }

//   login(username: string): boolean {
//     try {
//       this.currentUser.set({ username });
//       sessionStorage.setItem('sv_user', username);
//       return true; 
//     } catch (error) {
//       console.error("Vault access denied:", error);
//       return false;
//     }
//   }

//   logout() {
//     this.currentUser.set(null);
//     sessionStorage.removeItem('sv_user');
//   }

//   // Helper to check if user is logged in
//   isAuthenticated(): boolean {
//     return !!this.currentUser();
//   }
// }
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ProductDetailComponent } from './productdetail/productdetail';
import { CartComponent } from './cart/cart';
import { AuthModalComponent } from './authmodel/authmodel';

export const routes: Routes = [
 { path: '', component: HomeComponent },

  // 2. The Login/Signup Page (Auth Modal)
  { path: 'login', component: AuthModalComponent },

  // 3. The Product Detail Page (using :id for dynamic products)
  { path: 'product/:id', component: ProductDetailComponent },

  // 4. The Shopping Cart
  { path: 'cart', component: CartComponent },

  // 5. Wildcard (Redirect any broken links back to Home)
  { path: '**', redirectTo: '' }
];


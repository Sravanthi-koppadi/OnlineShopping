import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Search state integrated into the service
  searchQuery = signal<string>('');

  private products = signal<Product[]>([
    { id: 1, title: 'UltraBook Pro 15', price: 1200, category: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', description: 'Power meets portability with the latest UltraBook Pro.', rating: 4.9 },
    { id: 5, title: 'Noise Cancelling Headphones', price: 250, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', rating: 4.8 },
    { id: 9, title: 'Mechanical Keyboard', price: 110, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500', rating: 4.7 },
    { id: 10, title: 'Gaming Mouse', price: 65, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500', rating: 4.5 },
    { id: 11, title: '4K Mirrorless Camera', price: 1400, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500', rating: 4.9 },
    { id: 12, title: 'Smart Fitness Watch', price: 195, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', rating: 4.6 },
    { id: 13, title: 'External SSD 1TB', price: 130, category: 'Electronics', image: 'https://www.kenyacomputershop.co.ke/wp-content/uploads/2024/11/SanDisk-1TB-Portable-SSD-1-550x550w.jpg', rating: 4.7 },
    { id: 14, title: 'Portable Bluetooth Speaker', price: 75, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500', rating: 4.4 },
    { id: 33, title: 'Noise-Isolating Earbuds', price: 130, category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500', rating: 4.5 },
    { id: 37, title: 'Ultra-Wide Monitor', price: 450, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500', rating: 4.8 },
    
    // Clothing
    { id: 2, title: 'Slim Fit Denim', price: 45, category: 'Clothing', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', rating: 4.3 },
    { id: 6, title: 'Cotton Summer Dress', price: 35, category: 'Clothing', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', rating: 4.6 },
    { id: 15, title: 'Wool Blend Coat', price: 180, category: 'Clothing', image: 'https://www.uniqlo.com/jp/ja/contents/feature/masterpiece/common_22fw/img/item_14_01.jpg?220211', rating: 4.9 },
    { id: 34, title: 'Denim Jacket', price: 95, category: 'Clothing', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500', rating: 4.7 },

    // Accessories
    { id: 3, title: 'Leather Watch', price: 85, category: 'Accessories', image: 'https://www.watchgecko.com/cdn/shop/products/watch-straps-simple-handmade-italian-leather-watch-strap-reddish-brown-34686488674467_1200x.jpg?v=1663765227', rating: 4.8 },
    { id: 21, title: 'Polarized Sunglasses', price: 150, category: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', rating: 4.5 },

    // Furniture
    { id: 8, title: 'Velvet Sofa', price: 890, category: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500', rating: 4.9 },
    { id: 27, title: 'Ergonomic Office Chair', price: 320, category: 'Furniture', image: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2023_17/3587904/screen_shot_2022-12-21_at_10-24-08_am.png', rating: 4.8 }
  ]);

  // Combined Filtering logic (Search + All List)
  allProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const list = this.products();
    if (!query) return list;
    return list.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query)
    );
  });
  
  categories = computed(() => ["All", ...new Set(this.products().map(p => p.category))]);

  getProductById(id: number) {
    return this.products().find(p => p.id === id);
  }
}
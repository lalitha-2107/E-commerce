// Dummy product data for portfolio showcase — no database required

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in dollars for simplicity
  image: string;
  category: string;
  featured?: boolean;
};

export const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Home', slug: 'home' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'electronics',
    featured: true,
  },
  {
    id: '2',
    name: 'Minimal Watch',
    slug: 'minimal-watch',
    description: 'Sleek minimalist design with leather strap. Water-resistant.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'fashion',
    featured: true,
  },
  {
    id: '3',
    name: 'Desk Lamp',
    slug: 'desk-lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    category: 'home',
    featured: false,
  },
  {
    id: '4',
    name: 'Laptop Stand',
    slug: 'laptop-stand',
    description: 'Ergonomic aluminum stand for better posture and airflow.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    category: 'electronics',
    featured: false,
  },
  {
    id: '5',
    name: 'Cotton T-Shirt',
    slug: 'cotton-tshirt',
    description: 'Organic cotton unisex t-shirt. Available in multiple colors.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'fashion',
    featured: false,
  },
  {
    id: '6',
    name: 'Ceramic Vase',
    slug: 'ceramic-vase',
    description: 'Handcrafted ceramic vase, perfect for modern interiors.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400',
    category: 'home',
    featured: true,
  },
  {
    id: '7',
    name: 'Bluetooth Speaker',
    slug: 'bluetooth-speaker',
    description: 'Portable waterproof speaker with 20W output and 12-hour playtime.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    category: 'electronics',
    featured: false,
  },
  {
    id: '8',
    name: 'Running Sneakers',
    slug: 'running-sneakers',
    description: 'Lightweight running shoes with cushioned sole and breathable upper.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'fashion',
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'all') return products;
  return products.filter((p) => p.category === categorySlug);
}

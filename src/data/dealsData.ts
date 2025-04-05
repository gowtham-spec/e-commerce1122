
const sampleDeals = [
  {
    id: 'deal1',
    name: 'iPhone 14 Pro Max (512GB)',
    originalPrice: 1299,
    discountedPrice: 1099,
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
    discount: 15,
    category: 'Smartphones',
    brand: 'Apple',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: "Experience the power of Apple's latest flagship phone with stunning camera and incredible performance."
  },
  {
    id: 'deal2',
    name: 'Samsung Galaxy Book Pro',
    originalPrice: 1199,
    discountedPrice: 899,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
    discount: 25,
    category: 'Laptops',
    brand: 'Samsung',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Ultra-thin and powerful laptop with AMOLED display and all-day battery life.'
  },
  {
    id: 'deal3',
    name: 'Sony WH-1000XM5 Headphones',
    originalPrice: 399,
    discountedPrice: 299,
    image: 'https://images.unsplash.com/photo-1600086827875-a63b01f1335c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
    discount: 25,
    category: 'Audio',
    brand: 'Sony',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Industry-leading noise cancellation with premium sound quality and comfort.'
  },
  {
    id: 'deal4',
    name: 'MacBook Air M2',
    originalPrice: 1299,
    discountedPrice: 1099,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D',
    discount: 15,
    category: 'Laptops',
    brand: 'Apple',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Ultra-fast M2 chip with incredible battery life in a thin and light design.'
  },
  {
    id: 'deal5',
    name: 'Premium Cotton T-Shirt',
    originalPrice: 39.99,
    discountedPrice: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop',
    discount: 38,
    category: 'Clothing',
    brand: 'StyleTech',
    endsAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    description: 'Soft and comfortable cotton t-shirt with a modern fit. Perfect for everyday wear.',
    isLimitedOffer: true
  },
  {
    id: 'deal6',
    name: 'Designer Leather Wallet',
    originalPrice: 89.99,
    discountedPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop',
    discount: 33,
    category: 'Accessories',
    brand: 'LuxuryLeather',
    endsAt: new Date(Date.now() + 36 * 60 * 60 * 1000),
    description: 'Handcrafted genuine leather wallet with multiple card slots and premium stitching.'
  },
  {
    id: 'deal7',
    name: 'Hardcover Notebook - Dotted',
    originalPrice: 24.99,
    discountedPrice: 18.99,
    image: 'https://images.unsplash.com/photo-1531346680769-a1e79e0fb1b5?w=800&auto=format&fit=crop',
    discount: 24,
    category: 'Stationery',
    brand: 'PaperCraft',
    endsAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
    description: 'Premium dotted notebook with thick paper and lay-flat binding, perfect for bullet journaling.'
  },
  {
    id: 'deal8',
    name: 'Wireless Gaming Mouse',
    originalPrice: 59.99,
    discountedPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=800&auto=format&fit=crop',
    discount: 33,
    category: 'Peripherals',
    brand: 'GameTech',
    endsAt: new Date(Date.now() + 10 * 60 * 60 * 1000),
    description: 'High precision wireless mouse designed for gamers with programmable buttons and RGB lighting.',
    isLimitedOffer: true
  },
  {
    id: 'deal9',
    name: 'Luxury Perfume - Ocean Breeze',
    originalPrice: 120,
    discountedPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&auto=format&fit=crop',
    discount: 25,
    category: 'Fragrances',
    brand: 'AuraScent',
    endsAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
    description: 'Premium fragrance with notes of citrus, jasmine, and amber for a refreshing scent.',
    isLimitedOffer: true
  },
  {
    id: 'deal10',
    name: 'Premium Blue Denim Jeans',
    originalPrice: 119.99,
    discountedPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop',
    discount: 25,
    category: 'Clothing',
    brand: 'DenimCo',
    endsAt: new Date(Date.now() + 16 * 60 * 60 * 1000),
    description: 'Classic fit denim jeans made from high-quality cotton with stylish wash and details.'
  },
  {
    id: 'deal11',
    name: 'Smart LED TV - 55 inch',
    originalPrice: 799.99,
    discountedPrice: 649.99,
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800&auto=format&fit=crop',
    discount: 19,
    category: 'Electronics',
    brand: 'VisionTech',
    endsAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
    description: '4K Ultra HD Smart TV with HDR and built-in streaming apps for premium entertainment.',
    isLimitedOffer: true
  },
  {
    id: 'deal12',
    name: 'Leather Watch - Classic Edition',
    originalPrice: 199.99,
    discountedPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop',
    discount: 20,
    category: 'Accessories',
    brand: 'TimeMaster',
    endsAt: new Date(Date.now() + 5 * 60 * 60 * 1000),
    description: 'Classic analog watch with genuine leather strap and stainless steel case.',
    isLimitedOffer: true
  }
];

export type DealItem = typeof sampleDeals[0];
export default sampleDeals;

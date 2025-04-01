
// Sample deals data
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
    name: 'Samsung Galaxy S23 Ultra',
    originalPrice: 1199,
    discountedPrice: 949,
    image: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Ftc3VuZ3xlbnwwfHwwfHx8MA%3D%3D',
    discount: 20,
    category: 'Smartphones',
    brand: 'Samsung',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Flagship smartphone with 200MP camera and powerful Snapdragon processor.'
  },
  {
    id: 'deal6',
    name: 'iPad Pro 12.9" M2',
    originalPrice: 1099,
    discountedPrice: 949,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBhZHxlbnwwfHwwfHx8MA%3D%3D',
    discount: 14,
    category: 'Tablets',
    brand: 'Apple',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Pro-level tablet with stunning Liquid Retina XDR display and powerful M2 chip.'
  },
  {
    id: 'deal7',
    name: 'Google Pixel 7 Pro',
    originalPrice: 899,
    discountedPrice: 699,
    image: 'https://images.unsplash.com/photo-1635870723802-e88d76ae324e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl4ZWwlMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
    discount: 22,
    category: 'Smartphones',
    brand: 'Google',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: "Google's flagship phone with amazing camera capabilities and pure Android experience."
  },
  {
    id: 'deal8',
    name: 'Dell XPS 15',
    originalPrice: 1799,
    discountedPrice: 1499,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D',
    discount: 17,
    category: 'Laptops',
    brand: 'Dell',
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    description: 'Premium Windows laptop with incredible 4K display and powerful performance.'
  }
];

export type DealItem = typeof sampleDeals[0];
export default sampleDeals;

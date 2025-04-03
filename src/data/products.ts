
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  brand: string;
  tags: string[];
  sizes?: string[];
  colors?: string[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: {
    id: string;
    name: string;
  }[];
};

// Mock products data
export const products: Product[] = [
  // Stationery Category
  {
    id: "stationery-pen-1",
    name: "Premium Ballpoint Pen",
    description: "Smooth-writing premium ballpoint pen with comfortable grip. Perfect for everyday writing tasks with its long-lasting ink and sleek design.",
    price: 12.99,
    category: "stationery",
    subcategory: "pens",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200",
      "https://images.unsplash.com/photo-1625850299896-273a376afdae?q=80&w=1200",
    ],
    rating: 4.7,
    reviewCount: 128,
    stock: 250,
    featured: true,
    brand: "WriteCraft",
    tags: ["pen", "ballpoint", "office supplies"]
  },
  {
    id: "stationery-pen-2",
    name: "Fountain Pen Set",
    description: "Elegant fountain pen set with multiple nib options. Comes in a luxurious case perfect for gifting. Includes converter and ink cartridges.",
    price: 49.99,
    category: "stationery",
    subcategory: "pens",
    images: [
      "https://images.unsplash.com/photo-1579083390476-968b261e718d?q=80&w=1200", 
      "https://images.unsplash.com/photo-1607164828513-6ebab4e2660f?q=80&w=1200"
    ],
    rating: 4.9,
    reviewCount: 57,
    stock: 45,
    featured: true,
    brand: "InkMaster",
    tags: ["pen", "fountain pen", "gift", "luxury"]
  },
  {
    id: "stationery-notebook-1",
    name: "Leather-Bound Journal",
    description: "Handcrafted leather journal with premium paper. Features 240 pages of acid-free paper suitable for all writing instruments. Includes bookmark ribbon and elastic closure.",
    price: 29.99,
    category: "stationery",
    subcategory: "notebooks",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200",
      "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?q=80&w=1200"
    ],
    rating: 4.8,
    reviewCount: 93,
    stock: 78,
    featured: true,
    brand: "PaperLux",
    tags: ["notebook", "journal", "leather", "gift"]
  },
  {
    id: "stationery-notebook-2",
    name: "Spiral-Bound Notebook Pack",
    description: "Set of 5 spiral-bound notebooks in different colors. Perfect for students and professionals alike. Each notebook contains 80 college-ruled pages.",
    price: 18.99,
    category: "stationery",
    subcategory: "notebooks",
    images: [
      "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?q=80&w=1200",
      "https://images.unsplash.com/photo-1606388172956-5250e8cb0d3d?q=80&w=1200"
    ],
    rating: 4.5,
    reviewCount: 214,
    stock: 320,
    featured: false,
    brand: "StudyMate",
    tags: ["notebook", "spiral", "school supplies", "office"]
  },
  {
    id: "stationery-office-1",
    name: "Designer Stapler Set",
    description: "Modern designed stapler set with matching staple remover and box of staples. Capable of stapling up to 20 sheets at once. Ergonomic grip for comfort.",
    price: 24.95,
    category: "stationery",
    subcategory: "office supplies",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200",
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200"
    ],
    rating: 4.3,
    reviewCount: 67,
    stock: 112,
    featured: false,
    brand: "OfficeStyle",
    tags: ["stapler", "office supplies", "desk accessories"]
  },
  
  // Furniture & Home Appliances Category
  {
    id: "furniture-tv-1",
    name: "55-inch Smart OLED TV",
    description: "Ultra-thin 55-inch OLED smart TV with 4K resolution. Features built-in streaming apps, voice control, and 120Hz refresh rate for smooth motion. Includes multiple HDMI and USB ports.",
    price: 1299.99,
    category: "furniture",
    subcategory: "tvs",
    images: [
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1200",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200"
    ],
    rating: 4.8,
    reviewCount: 342,
    stock: 38,
    featured: true,
    brand: "VisualPro",
    tags: ["TV", "smart TV", "OLED", "entertainment"]
  },
  {
    id: "furniture-tv-2",
    name: "65-inch QLED Smart TV",
    description: "Premium 65-inch QLED TV with quantum dot technology for vibrant colors. Features include AI upscaling, gaming mode with low latency, and integrated sound system.",
    price: 1499.99,
    category: "furniture",
    subcategory: "tvs",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1200",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1200"
    ],
    rating: 4.9,
    reviewCount: 187,
    stock: 25,
    featured: true,
    brand: "QuantumView",
    tags: ["TV", "QLED", "smart TV", "home theater"]
  },
  {
    id: "furniture-ac-1",
    name: "Smart Inverter Air Conditioner",
    description: "Energy-efficient 12,000 BTU air conditioner with smart inverter technology. Features include Wi-Fi connectivity, app control, and quiet operation. Cools up to 550 sq. ft.",
    price: 549.99,
    category: "furniture",
    subcategory: "acs",
    images: [
      "https://images.unsplash.com/photo-1625502548391-bf40a5fc75fc?q=80&w=1200",
      "https://images.unsplash.com/photo-1664728712503-545a0ddf5c07?q=80&w=1200"
    ],
    rating: 4.6,
    reviewCount: 128,
    stock: 42,
    featured: false,
    brand: "CoolMaster",
    tags: ["air conditioner", "AC", "smart home", "cooling"]
  },
  {
    id: "furniture-refrigerator-1",
    name: "French Door Refrigerator",
    description: "Spacious 26 cu. ft. french door refrigerator with water and ice dispenser. Features adjustable shelving, temperature-controlled drawers, and energy-saving mode.",
    price: 1899.99,
    category: "furniture",
    subcategory: "refrigerators",
    images: [
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=1200",
      "https://images.unsplash.com/photo-1543539748-a3eb58215726?q=80&w=1200"
    ],
    rating: 4.7,
    reviewCount: 203,
    stock: 18,
    featured: true,
    brand: "FrostTech",
    tags: ["refrigerator", "french door", "kitchen appliance", "food storage"]
  },
  {
    id: "furniture-sofa-1",
    name: "Modular Sectional Sofa",
    description: "Customizable modular sectional sofa with chaise lounge. Features stain-resistant fabric upholstery, hardwood frame, and high-density foam cushions for maximum comfort.",
    price: 1249.99,
    category: "furniture",
    subcategory: "sofas",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200"
    ],
    rating: 4.5,
    reviewCount: 156,
    stock: 12,
    featured: true,
    brand: "ComfortLiving",
    tags: ["sofa", "sectional", "living room", "furniture"]
  },
  {
    id: "furniture-sofa-2",
    name: "Convertible Sleeper Sofa",
    description: "Modern sleeper sofa that easily converts from couch to bed. Features memory foam mattress, USB charging ports, and durable linen upholstery.",
    price: 899.99,
    category: "furniture",
    subcategory: "sofas",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200"
    ],
    rating: 4.4,
    reviewCount: 98,
    stock: 22,
    featured: false,
    brand: "SleepWell",
    tags: ["sofa", "sleeper", "convertible", "guest bed"]
  },
  
  // Clothing Category - NEW
  {
    id: "clothing-shirt-1",
    name: "Premium Cotton Dress Shirt",
    description: "Classic dress shirt made from 100% Egyptian cotton with a tailored fit. Features wrinkle-resistant fabric and mother-of-pearl buttons.",
    price: 79.99,
    category: "clothing",
    subcategory: "shirts",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=1200"
    ],
    rating: 4.6,
    reviewCount: 183,
    stock: 120,
    featured: true,
    brand: "ClothMaster",
    tags: ["shirt", "formal", "dress shirt", "cotton"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Blue", "Black"]
  },
  {
    id: "clothing-shirt-2",
    name: "Casual Linen Shirt",
    description: "Breathable linen shirt perfect for warm weather. Features a relaxed fit and natural texture ideal for casual occasions.",
    price: 59.99,
    category: "clothing",
    subcategory: "shirts",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200",
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=1200"
    ],
    rating: 4.5,
    reviewCount: 143,
    stock: 95,
    featured: false,
    brand: "SummerWear",
    tags: ["shirt", "casual", "linen", "summer"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "White", "Light Blue", "Green"]
  },
  {
    id: "clothing-pants-1",
    name: "Slim Fit Chino Pants",
    description: "Classic chino pants with a modern slim fit. Made from stretch cotton for comfort and easy movement throughout the day.",
    price: 69.99,
    category: "clothing",
    subcategory: "pants",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200"
    ],
    rating: 4.7,
    reviewCount: 211,
    stock: 150,
    featured: true,
    brand: "UrbanStyle",
    tags: ["pants", "chino", "slim fit", "casual"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Khaki", "Navy", "Gray", "Olive"]
  },
  {
    id: "clothing-pants-2",
    name: "Athletic Performance Joggers",
    description: "Lightweight joggers designed for maximum comfort during workouts. Features moisture-wicking fabric and zippered pockets.",
    price: 49.99,
    category: "clothing",
    subcategory: "pants",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1200",
      "https://images.unsplash.com/photo-1580906853203-f82f5cab5b8b?q=80&w=1200"
    ],
    rating: 4.8,
    reviewCount: 187,
    stock: 130,
    featured: false,
    brand: "ActiveFit",
    tags: ["pants", "joggers", "athletic", "workout"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray", "Navy", "Red"]
  },
  
  // Electronics Category - NEW
  {
    id: "electronics-laptop-1",
    name: "UltraBook Pro 16",
    description: "Powerful laptop with 16-inch Retina display, latest generation processor, 16GB RAM, and 512GB SSD storage. Perfect for creative professionals.",
    price: 1899.99,
    category: "electronics",
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1200",
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1200"
    ],
    rating: 4.9,
    reviewCount: 342,
    stock: 75,
    featured: true,
    brand: "TechPro",
    tags: ["laptop", "computer", "ultrabook", "professional"]
  },
  {
    id: "electronics-laptop-2",
    name: "Gaming Laptop Elite",
    description: "High-performance gaming laptop with RGB keyboard, dedicated graphics card, 144Hz display, and advanced cooling system for marathon gaming sessions.",
    price: 1699.99,
    category: "electronics",
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1200",
      "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1200"
    ],
    rating: 4.7,
    reviewCount: 263,
    stock: 55,
    featured: true,
    brand: "GameMaster",
    tags: ["laptop", "gaming", "high performance", "rgb"]
  },
  {
    id: "electronics-smartphone-1",
    name: "FlagShip X Pro Smartphone",
    description: "Latest flagship smartphone with 6.7-inch OLED display, 108MP camera system, all-day battery life, and the most powerful mobile processor available.",
    price: 1099.99,
    category: "electronics",
    subcategory: "smartphones",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1200"
    ],
    rating: 4.8,
    reviewCount: 521,
    stock: 120,
    featured: true,
    brand: "MobileTech",
    tags: ["smartphone", "mobile", "camera", "flagship"],
    colors: ["Midnight Black", "Silver", "Blue", "Red"]
  },
  
  // Toys Category - NEW
  {
    id: "toys-building-1",
    name: "Ultimate Building Blocks Set",
    description: "Creative building blocks set with 1000+ pieces to build anything imaginable. Great for developing motor skills and creativity in children ages 4 and up.",
    price: 59.99,
    category: "toys",
    subcategory: "building",
    images: [
      "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?q=80&w=1200",
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=1200"
    ],
    rating: 4.9,
    reviewCount: 432,
    stock: 200,
    featured: true,
    brand: "BlockMaster",
    tags: ["toys", "building blocks", "creative", "kids"]
  },
  {
    id: "toys-puzzle-1",
    name: "3D Wooden Puzzle Set",
    description: "Challenging wooden puzzles that help develop problem-solving skills and patience. Set includes 5 different puzzles of increasing difficulty.",
    price: 34.99,
    category: "toys",
    subcategory: "puzzles",
    images: [
      "https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=1200",
      "https://images.unsplash.com/photo-1590367470863-e196a15a8858?q=80&w=1200"
    ],
    rating: 4.6,
    reviewCount: 187,
    stock: 120,
    featured: false,
    brand: "BrainGames",
    tags: ["toys", "puzzles", "wooden", "educational"]
  },
  
  // Tools Category - NEW
  {
    id: "tools-powertools-1",
    name: "Professional Drill Kit",
    description: "Complete drill kit with multiple drill bits, variable speed control, and long-lasting battery. Perfect for both DIY enthusiasts and professionals.",
    price: 149.99,
    category: "tools",
    subcategory: "powertools",
    images: [
      "https://images.unsplash.com/photo-1581147036324-c71f53d16dc7?q=80&w=1200",
      "https://images.unsplash.com/photo-1526714719019-b3032b5b5aac?q=80&w=1200"
    ],
    rating: 4.8,
    reviewCount: 324,
    stock: 85,
    featured: true,
    brand: "ToolMaster",
    tags: ["tools", "drill", "power tools", "DIY"]
  },
  {
    id: "tools-handtools-1",
    name: "Premium Screwdriver Set",
    description: "Complete set of precision screwdrivers with ergonomic handles. Includes Phillips, flathead, and specialty bits for all household needs.",
    price: 39.99,
    category: "tools",
    subcategory: "handtools",
    images: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=1200",
      "https://images.unsplash.com/photo-1580902215262-9b941bc6eab3?q=80&w=1200"
    ],
    rating: 4.7,
    reviewCount: 213,
    stock: 150,
    featured: false,
    brand: "ToolPro",
    tags: ["tools", "screwdrivers", "hand tools", "DIY"]
  }
];

export const categories: Category[] = [
  {
    id: "stationery",
    name: "Stationery",
    description: "High-quality pens, notebooks, and office supplies for work and study.",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200",
    subcategories: [
      { id: "pens", name: "Pens & Writing Tools" },
      { id: "notebooks", name: "Notebooks & Journals" },
      { id: "office-supplies", name: "Office Supplies" }
    ]
  },
  {
    id: "furniture",
    name: "Furniture & Appliances",
    description: "Modern furniture and home appliances for comfortable living.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
    subcategories: [
      { id: "tvs", name: "TVs & Entertainment" },
      { id: "acs", name: "Air Conditioners" },
      { id: "refrigerators", name: "Refrigerators" },
      { id: "sofas", name: "Sofas & Seating" }
    ]
  },
  {
    id: "clothing",
    name: "Clothing & Apparel",
    description: "Stylish clothing for all occasions from top-rated brands.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200",
    subcategories: [
      { id: "shirts", name: "Shirts & Tops" },
      { id: "pants", name: "Pants & Bottoms" },
      { id: "outerwear", name: "Jackets & Outerwear" },
      { id: "sportswear", name: "Sportswear" }
    ]
  },
  {
    id: "electronics",
    name: "Electronics & Gadgets",
    description: "Latest technology products for work and entertainment.",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1200",
    subcategories: [
      { id: "laptops", name: "Laptops & Computers" },
      { id: "smartphones", name: "Smartphones & Accessories" },
      { id: "audio", name: "Audio Equipment" },
      { id: "cameras", name: "Cameras & Photo" }
    ]
  },
  {
    id: "toys",
    name: "Toys & Games",
    description: "Fun and educational toys for children of all ages.",
    image: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?q=80&w=1200",
    subcategories: [
      { id: "building", name: "Building Sets" },
      { id: "puzzles", name: "Puzzles & Games" },
      { id: "educational", name: "Educational Toys" },
      { id: "outdoor", name: "Outdoor Play" }
    ]
  },
  {
    id: "tools",
    name: "Tools & Hardware",
    description: "Quality tools for DIY projects and professional work.",
    image: "https://images.unsplash.com/photo-1581147036324-c71f53d16dc7?q=80&w=1200",
    subcategories: [
      { id: "powertools", name: "Power Tools" },
      { id: "handtools", name: "Hand Tools" },
      { id: "storage", name: "Tool Storage" },
      { id: "safety", name: "Safety Equipment" }
    ]
  }
];

// Helper functions to get products
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsBySubcategory = (subcategory: string): Product[] => {
  return products.filter(product => product.subcategory === subcategory);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterProducts = (
  categoryFilter?: string,
  priceRange?: { min: number; max: number },
  brandFilter?: string[],
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest'
): Product[] => {
  let filteredProducts = [...products];
  
  // Apply category filter
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(
      product => product.category === categoryFilter
    );
  }
  
  // Apply price range filter
  if (priceRange) {
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
  }
  
  // Apply brand filter
  if (brandFilter && brandFilter.length > 0) {
    filteredProducts = filteredProducts.filter(
      product => brandFilter.includes(product.brand)
    );
  }
  
  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming newest would be based on id for our mock data
        filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }
  }
  
  return filteredProducts;
};

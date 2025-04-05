
const productsData = [
  {
    id: "p1",
    name: "Premium Cotton T-Shirt",
    description: "Soft and comfortable cotton t-shirt with a modern fit. Perfect for everyday wear.",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop"
    ],
    category: "clothing",
    subcategory: "shirts",
    brand: "StyleTech",
    rating: 4.5,
    reviewCount: 128,
    stock: 45,
    featured: true,
    colors: ["Black", "White", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specifications: {
      material: "100% Cotton",
      fit: "Regular",
      care: "Machine wash cold"
    }
  },
  {
    id: "p2",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30 hours of battery life and superior sound quality.",
    price: 199.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop"
    ],
    category: "electronics",
    subcategory: "audio",
    brand: "SoundWave",
    rating: 4.7,
    reviewCount: 342,
    stock: 18,
    featured: true,
    colors: ["Black", "Silver", "Blue"],
    specifications: {
      batteryLife: "30 hours",
      connectivity: "Bluetooth 5.0",
      features: "Active Noise Cancellation, Voice Assistant"
    }
  },
  {
    id: "p3",
    name: "Smart Fitness Watch",
    description: "Track your workouts, sleep, and health metrics with this advanced fitness tracker.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&auto=format&fit=crop"
    ],
    category: "electronics",
    subcategory: "wearables",
    brand: "TechFit",
    rating: 4.3,
    reviewCount: 215,
    stock: 32,
    featured: true,
    colors: ["Black", "White", "Rose Gold"],
    specifications: {
      display: "AMOLED",
      battery: "7 days standby",
      waterResistance: "50m",
      sensors: "Heart rate, GPS, Accelerometer"
    }
  },
  {
    id: "p4",
    name: "Designer Leather Wallet",
    description: "Handcrafted genuine leather wallet with multiple card slots and premium stitching.",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556774687-0e2fdd0116c0?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559474223-a661fde39934?w=800&auto=format&fit=crop"
    ],
    category: "accessories",
    subcategory: "wallets",
    brand: "LuxuryLeather",
    rating: 4.8,
    reviewCount: 86,
    stock: 15,
    featured: false,
    colors: ["Brown", "Black", "Tan"],
    specifications: {
      material: "Genuine Leather",
      cardSlots: "8",
      billCompartments: "2"
    }
  },
  {
    id: "p5",
    name: "Ergonomic Office Chair",
    description: "High-back mesh office chair with lumbar support and adjustable features for all-day comfort.",
    price: 249.99,
    images: [
      "https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=800&auto=format&fit=crop"
    ],
    category: "furniture",
    subcategory: "chairs",
    brand: "ErgoDesign",
    rating: 4.6,
    reviewCount: 124,
    stock: 7,
    featured: false,
    specifications: {
      material: "Mesh and Metal",
      maxWeight: "300 lbs",
      adjustableHeight: "Yes",
      armrests: "Adjustable"
    }
  },
  {
    id: "p6",
    name: "Stainless Steel Water Bottle",
    description: "Vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610824224317-c02f83286701?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop"
    ],
    category: "home",
    subcategory: "kitchen",
    brand: "EcoHydrate",
    rating: 4.4,
    reviewCount: 209,
    stock: 53,
    featured: false,
    colors: ["Silver", "Black", "Blue", "Red"],
    specifications: {
      capacity: "750ml",
      material: "18/8 Stainless Steel",
      insulation: "Double-wall vacuum"
    }
  },
  {
    id: "p7",
    name: "Professional Digital Camera",
    description: "24MP digital camera with 4K video recording and advanced autofocus system.",
    price: 899.99,
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=800&auto=format&fit=crop"
    ],
    category: "electronics",
    subcategory: "cameras",
    brand: "PhotoPro",
    rating: 4.9,
    reviewCount: 57,
    stock: 8,
    featured: true,
    specifications: {
      megapixels: "24MP",
      sensor: "Full-frame CMOS",
      video: "4K/60fps",
      iso: "100-51200"
    }
  },
  {
    id: "p8",
    name: "Premium Blue Denim Jeans",
    description: "Classic fit denim jeans made from high-quality cotton with stylish wash and details.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&auto=format&fit=crop"
    ],
    category: "clothing",
    subcategory: "pants",
    brand: "DenimCo",
    rating: 4.3,
    reviewCount: 186,
    stock: 29,
    featured: false,
    colors: ["Blue", "Black", "Gray"],
    sizes: ["30", "32", "34", "36", "38", "40"],
    specifications: {
      material: "98% Cotton, 2% Elastane",
      fit: "Regular",
      rise: "Mid-rise"
    }
  },
  {
    id: "p9",
    name: "Mechanical Gaming Keyboard",
    description: "RGB mechanical gaming keyboard with programmable keys and durable construction.",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1561112078-7d24e04c3407?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop"
    ],
    category: "electronics",
    subcategory: "peripherals",
    brand: "GameTech",
    rating: 4.7,
    reviewCount: 143,
    stock: 21,
    featured: false,
    specifications: {
      switchType: "Blue mechanical switches",
      backlighting: "RGB",
      keyRollover: "N-key rollover",
      connection: "USB-C"
    }
  },
  {
    id: "p10",
    name: "Natural Bamboo Cutting Board",
    description: "Durable bamboo cutting board with juice grooves and convenient handle design.",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1591317799569-5ac8b5dd4f96?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598003266988-5586343cf9e1?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550963295-019d8a8a61c5?w=800&auto=format&fit=crop"
    ],
    category: "home",
    subcategory: "kitchen",
    brand: "EcoKitchen",
    rating: 4.5,
    reviewCount: 74,
    stock: 45,
    featured: false,
    specifications: {
      material: "Bamboo",
      size: "18 x 12 inches",
      care: "Hand wash only"
    }
  },
  {
    id: "p11",
    name: "Fine Point Art Pens Set",
    description: "Professional 12-color fineliner pens set ideal for drawing, sketching and coloring.",
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581855339095-0c282d58527b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558097380-27a759d0e707?w=800&auto=format&fit=crop"
    ],
    category: "stationery",
    subcategory: "pens",
    brand: "ArtistChoice",
    rating: 4.6,
    reviewCount: 113,
    stock: 67,
    featured: false,
    specifications: {
      tipSize: "0.4mm",
      inkType: "Water-based",
      quantity: "12 colors"
    }
  },
  {
    id: "p12",
    name: "Leather Watch - Classic Edition",
    description: "Classic analog watch with genuine leather strap and stainless steel case.",
    price: 159.99,
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624523942805-6fd74b4d4f61?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&auto=format&fit=crop"
    ],
    category: "accessories",
    subcategory: "watches",
    brand: "TimeMaster",
    rating: 4.8,
    reviewCount: 95,
    stock: 11,
    featured: true,
    colors: ["Brown", "Black"],
    specifications: {
      movement: "Quartz",
      caseSize: "42mm",
      waterResistance: "30m",
      strap: "Genuine Leather"
    }
  },
  {
    id: "p13",
    name: "Luxury Perfume - Ocean Breeze",
    description: "Premium fragrance with notes of citrus, jasmine, and amber for a refreshing scent.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566977776052-6e61e28f31d9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop"
    ],
    category: "accessories",
    subcategory: "fragrance",
    brand: "AuraScent",
    rating: 4.5,
    reviewCount: 72,
    stock: 23,
    featured: false,
    specifications: {
      volume: "50ml",
      scent: "Fresh/Citrus",
      concentration: "Eau de Parfum"
    }
  },
  {
    id: "p14",
    name: "Smart LED TV - 55 inch",
    description: "4K Ultra HD Smart TV with HDR and built-in streaming apps for premium entertainment.",
    price: 649.99,
    images: [
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop"
    ],
    category: "furniture",
    subcategory: "electronics",
    brand: "VisionTech",
    rating: 4.6,
    reviewCount: 137,
    stock: 9,
    featured: true,
    specifications: {
      size: "55 inches",
      resolution: "4K Ultra HD (3840 x 2160)",
      refreshRate: "60Hz",
      connectivity: "Wi-Fi, Bluetooth, HDMI x 3, USB x 2"
    }
  },
  {
    id: "p15",
    name: "Hardcover Notebook - Dotted",
    description: "Premium dotted notebook with thick paper and lay-flat binding, perfect for bullet journaling.",
    price: 18.99,
    images: [
      "https://images.unsplash.com/photo-1531346680769-a1e79e0fb1b5?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=800&auto=format&fit=crop"
    ],
    category: "stationery",
    subcategory: "notebooks",
    brand: "PaperCraft",
    rating: 4.7,
    reviewCount: 89,
    stock: 34,
    featured: false,
    colors: ["Black", "Navy", "Red", "Green"],
    specifications: {
      pages: "192 pages",
      paperWeight: "100gsm",
      size: "A5 (5.8\" x 8.3\")",
      binding: "Lay-flat binding"
    }
  },
  {
    id: "p16",
    name: "Modern Coffee Table",
    description: "Sleek minimalist coffee table with wooden top and metal legs for contemporary living spaces.",
    price: 229.99,
    images: [
      "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554295405-abb8fd54f153?w=800&auto=format&fit=crop"
    ],
    category: "furniture",
    subcategory: "tables",
    brand: "ModernHome",
    rating: 4.4,
    reviewCount: 52,
    stock: 6,
    featured: false,
    specifications: {
      material: "Walnut veneer, Powder-coated steel",
      dimensions: "47\" W x 23\" D x 16\" H",
      assembly: "Required",
      weight: "42 lbs"
    }
  },
  {
    id: "p17",
    name: "Wireless Computer Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI and silent click technology.",
    price: 39.99,
    images: [
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625723044792-44de16ccb4e4?w=800&auto=format&fit=crop"
    ],
    category: "electronics",
    subcategory: "peripherals",
    brand: "TechGear",
    rating: 4.3,
    reviewCount: 211,
    stock: 43,
    featured: false,
    colors: ["Black", "Gray", "White"],
    specifications: {
      dpi: "Up to 4000 DPI",
      buttons: "6 programmable buttons",
      battery: "Up to 12 months",
      connectivity: "2.4 GHz wireless"
    }
  },
  {
    id: "p18",
    name: "Premium Colored Pencils - 36 Set",
    description: "Professional-grade colored pencils set with vibrant pigments for artists and illustrators.",
    price: 28.99,
    images: [
      "https://images.unsplash.com/photo-1603351154351-5e2d0eca3481?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522111608460-19e7331e00fb?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop"
    ],
    category: "stationery",
    subcategory: "art supplies",
    brand: "ArtistChoice",
    rating: 4.8,
    reviewCount: 127,
    stock: 31,
    featured: false,
    specifications: {
      count: "36 colors",
      leadType: "Soft core",
      boxType: "Metal tin",
      blendability: "High"
    }
  },
  {
    id: "p19",
    name: "Smart Air Conditioner",
    description: "Energy-efficient smart air conditioner with Wi-Fi control and voice assistant compatibility.",
    price: 549.99,
    images: [
      "https://images.unsplash.com/photo-1593233546089-2a13e3c9096d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543855549-4ab79f1db68b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552243128-33e49f9d5846?w=800&auto=format&fit=crop"
    ],
    category: "furniture",
    subcategory: "appliances",
    brand: "CoolTech",
    rating: 4.5,
    reviewCount: 98,
    stock: 7,
    featured: true,
    specifications: {
      capacity: "12,000 BTU",
      coverage: "Up to 550 sq. ft.",
      features: "Wi-Fi, Voice Control, Schedule",
      energyRating: "Energy Star Certified"
    }
  },
  {
    id: "p20",
    name: "Silver Chain Bracelet",
    description: "Elegant sterling silver chain bracelet with adjustable length and secure clasp.",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574621100236-d25b64cfd647?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&auto=format&fit=crop"
    ],
    category: "accessories",
    subcategory: "jewelry",
    brand: "SilverCraft",
    rating: 4.7,
    reviewCount: 63,
    stock: 19,
    featured: false,
    specifications: {
      material: "925 Sterling Silver",
      length: "Adjustable 6-8 inches",
      clasp: "Lobster clasp",
      weight: "8g"
    }
  }
];

export default productsData;

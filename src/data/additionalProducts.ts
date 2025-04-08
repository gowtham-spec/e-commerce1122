
const additionalProducts = [
  {
    id: "p26",
    name: "Smart LED Bulb Pack - 4 Bulbs",
    description: "Smart LED bulbs with app control, voice assistant compatibility, and millions of colors.",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1621492934805-3cebdbd01746?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556740759-00c7f7590f9b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&auto=format&fit=crop"
    ],
    category: "electronics",
    subcategory: "smart home",
    brand: "SmartLite",
    rating: 4.4,
    reviewCount: 147,
    stock: 22,
    featured: false,
    specifications: {
      wattage: "9W equivalent",
      lifespan: "25,000 hours",
      connectivity: "Wi-Fi, Bluetooth",
      compatibility: "Works with Alexa, Google Assistant"
    }
  },
  {
    id: "p27",
    name: "Handcrafted Ceramic Tea Set",
    description: "Traditional handcrafted ceramic tea set with teapot and 4 cups in elegant design.",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1563826904577-6b72c5d75e53?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594108498995-5c71f4b7803a?w=800&auto=format&fit=crop"
    ],
    category: "home",
    subcategory: "kitchen",
    brand: "ArtisanCraft",
    rating: 4.9,
    reviewCount: 78,
    stock: 11,
    featured: true,
    colors: ["Blue", "Green", "Brown"],
    specifications: {
      material: "Hand-painted ceramic",
      capacity: "Teapot: 850ml, Cups: 150ml each",
      pieces: "5 piece set",
      care: "Hand wash recommended"
    }
  },
  {
    id: "p28",
    name: "Portable Bluetooth Speaker - Waterproof",
    description: "Rugged, waterproof bluetooth speaker with 20 hours battery life and deep bass.",
    price: 2499,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606127196645-c787fe1bc29b?w=800&auto=format&fit=crop"
    ],
    category: "electronics",
    subcategory: "audio",
    brand: "SoundWave",
    rating: 4.6,
    reviewCount: 213,
    stock: 31,
    featured: false,
    colors: ["Black", "Blue", "Orange"],
    specifications: {
      batteryLife: "20 hours",
      waterproof: "IPX7 rated",
      connectivity: "Bluetooth 5.0",
      power: "30W output"
    }
  },
  {
    id: "p29",
    name: "Handloom Cotton Saree",
    description: "Traditional handloom cotton saree with temple border and blouse piece.",
    price: 2999,
    images: [
      "https://images.unsplash.com/photo-1610189016766-75c05c7b834b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614258693107-304e6350b34d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&auto=format&fit=crop"
    ],
    category: "clothing",
    subcategory: "traditional",
    brand: "WeaveIndia",
    rating: 4.8,
    reviewCount: 94,
    stock: 15,
    featured: true,
    colors: ["Red", "Blue", "Green", "Yellow"],
    specifications: {
      material: "100% Cotton",
      length: "6.3 meters",
      weaveType: "Handloom",
      includes: "Matching blouse piece"
    }
  },
  {
    id: "p30",
    name: "Spice Box Set - Masala Dabba",
    description: "Traditional Indian spice box with 7 compartments and spoon, perfect for organizing kitchen spices.",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1532336414038-cf19250c192b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1641233470760-462bc83e7a55?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&auto=format&fit=crop"
    ],
    category: "home",
    subcategory: "kitchen",
    brand: "KitchenIndia",
    rating: 4.7,
    reviewCount: 126,
    stock: 37,
    featured: false,
    specifications: {
      material: "Stainless Steel",
      dimensions: "20cm diameter x 7cm height",
      compartments: "7 containers with lids",
      includes: "Stainless steel spoon"
    }
  },
  {
    id: "p31",
    name: "Electric Pressure Cooker",
    description: "Multi-functional electric pressure cooker with 12 preset cooking programs.",
    price: 4999,
    images: [
      "https://images.unsplash.com/photo-1585607344662-c535224e8e48?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1676404622643-fb0cf1644a56?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612198791406-4a58f4e478ee?w=800&auto=format&fit=crop"
    ],
    category: "home",
    subcategory: "appliances",
    brand: "KitchenPro",
    rating: 4.6,
    reviewCount: 285,
    stock: 19,
    featured: true,
    specifications: {
      capacity: "6 liters",
      programs: "12 preset programs",
      material: "Stainless Steel inner pot",
      features: "Delay timer, Keep warm function"
    }
  },
  {
    id: "p32",
    name: "Yoga Mat - Premium",
    description: "Eco-friendly, non-slip yoga mat with alignment lines and carrying strap.",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611657360310-9b1be478927c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop"
    ],
    category: "sports",
    subcategory: "yoga",
    brand: "FitLife",
    rating: 4.5,
    reviewCount: 173,
    stock: 42,
    featured: false,
    colors: ["Purple", "Blue", "Green", "Black"],
    specifications: {
      material: "Eco-friendly TPE",
      thickness: "6mm",
      dimensions: "183cm x 61cm",
      features: "Non-slip surface, Alignment marks"
    }
  },
  {
    id: "p33",
    name: "Stainless Steel Lunch Box Set",
    description: "Set of 3 stackable stainless steel lunch boxes with airtight lids.",
    price: 799,
    images: [
      "https://images.unsplash.com/photo-1621360841013-c7683c659ec6?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1652099539323-4fc70f91f2c3?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604383091433-84ac6930a255?w=800&auto=format&fit=crop"
    ],
    category: "home",
    subcategory: "kitchen",
    brand: "EcoMeal",
    rating: 4.4,
    reviewCount: 97,
    stock: 63,
    featured: false,
    specifications: {
      material: "Food-grade stainless steel",
      pieces: "3 containers with lids",
      capacity: "350ml, 500ml, 750ml",
      features: "Leak-proof, BPA-free"
    }
  }
];

export default additionalProducts;

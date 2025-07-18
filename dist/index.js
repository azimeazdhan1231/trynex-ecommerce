// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// client/src/data/products.json
var products_default = {
  products: [
    {
      id: "1",
      name: "Classic Ceramic Mug",
      price: 550,
      originalPrice: 700,
      category: "mugs",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium quality ceramic mug with elegant golden rim finish",
      rating: 4.8,
      reviews: 24,
      inStock: true,
      isOnSale: true,
      discount: 21,
      variants: {
        color: ["White", "Black", "Gold"],
        size: ["250ml", "350ml", "500ml"]
      },
      tags: ["premium", "ceramic", "golden rim"]
    },
    {
      id: "2",
      name: "Designer Mug",
      price: 650,
      category: "mugs",
      image: "https://images.unsplash.com/photo-1581330221805-3b14cc57e44c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Artistic designer mug with unique patterns and premium finish",
      rating: 4.6,
      reviews: 18,
      inStock: true,
      isNew: true,
      variants: {
        color: ["Blue", "Red", "Green"],
        size: ["300ml", "400ml"]
      },
      tags: ["designer", "artistic", "unique"]
    },
    {
      id: "3",
      name: "Personalized Mug",
      price: 700,
      category: "mugs",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Custom personalized mug with your name or photo",
      rating: 4.9,
      reviews: 35,
      inStock: true,
      variants: {
        color: ["White", "Black"],
        size: ["350ml", "500ml"]
      },
      tags: ["personalized", "custom", "gift"]
    },
    {
      id: "4",
      name: "Travel Mug",
      price: 800,
      category: "mugs",
      image: "https://images.unsplash.com/photo-1611074774996-3d2b9c87d1f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Insulated travel mug with spill-proof lid",
      rating: 4.7,
      reviews: 29,
      inStock: true,
      variants: {
        color: ["Silver", "Black", "Blue"],
        size: ["400ml", "600ml"]
      },
      tags: ["travel", "insulated", "spill-proof"]
    },
    {
      id: "5",
      name: "Comfort T-Shirt",
      price: 550,
      category: "tshirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium cotton t-shirt with comfortable fit",
      rating: 4.5,
      reviews: 42,
      inStock: true,
      variants: {
        color: ["White", "Black", "Navy", "Gray"],
        size: ["S", "M", "L", "XL", "XXL"]
      },
      tags: ["comfort", "cotton", "premium"]
    },
    {
      id: "6",
      name: "Premium Graphic Tee",
      price: 600,
      category: "tshirts",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726bd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Stylish graphic t-shirt with modern design",
      rating: 4.4,
      reviews: 33,
      inStock: true,
      lowStock: true,
      variants: {
        color: ["Black", "White", "Red"],
        size: ["S", "M", "L", "XL"]
      },
      tags: ["graphic", "stylish", "modern"]
    },
    {
      id: "7",
      name: "Custom T-Shirt",
      price: 650,
      category: "tshirts",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Customizable t-shirt with your design or text",
      rating: 4.8,
      reviews: 56,
      inStock: true,
      variants: {
        color: ["White", "Black", "Gray", "Navy"],
        size: ["S", "M", "L", "XL", "XXL"]
      },
      tags: ["custom", "personalized", "design"]
    },
    {
      id: "8",
      name: "Oversized Tee",
      price: 700,
      category: "tshirts",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Trendy oversized t-shirt for casual wear",
      rating: 4.6,
      reviews: 21,
      inStock: true,
      isNew: true,
      variants: {
        color: ["Beige", "Black", "White"],
        size: ["M", "L", "XL", "XXL"]
      },
      tags: ["oversized", "trendy", "casual"]
    },
    {
      id: "9",
      name: "Elegant Keychain",
      price: 400,
      category: "keychains",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Elegant metal keychain with premium finish",
      rating: 4.7,
      reviews: 67,
      inStock: true,
      variants: {
        color: ["Gold", "Silver", "Bronze"]
      },
      tags: ["elegant", "metal", "premium"]
    },
    {
      id: "10",
      name: "Custom Keychain",
      price: 450,
      category: "keychains",
      image: "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Personalized keychain with custom engraving",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      variants: {
        color: ["Silver", "Gold", "Black"]
      },
      tags: ["custom", "engraving", "personalized"]
    },
    {
      id: "11",
      name: "Metal Keychain",
      price: 500,
      category: "keychains",
      image: "https://images.unsplash.com/photo-1586953981332-f0e65b6e1b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Durable metal keychain with stylish design",
      rating: 4.5,
      reviews: 43,
      inStock: true,
      variants: {
        color: ["Silver", "Black", "Gold"]
      },
      tags: ["metal", "durable", "stylish"]
    },
    {
      id: "12",
      name: "Leather Keychain",
      price: 600,
      category: "keychains",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium leather keychain with elegant look",
      rating: 4.8,
      reviews: 32,
      inStock: true,
      variants: {
        color: ["Brown", "Black", "Tan"]
      },
      tags: ["leather", "premium", "elegant"]
    },
    {
      id: "13",
      name: "Eco-Friendly Bottle",
      price: 800,
      category: "bottles",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Eco-friendly water bottle made from sustainable materials",
      rating: 4.6,
      reviews: 58,
      inStock: true,
      variants: {
        color: ["Green", "Blue", "White"],
        size: ["500ml", "750ml", "1000ml"]
      },
      tags: ["eco-friendly", "sustainable", "water"]
    },
    {
      id: "14",
      name: "Insulated Bottle",
      price: 900,
      category: "bottles",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Double-wall insulated bottle keeps drinks hot or cold",
      rating: 4.7,
      reviews: 76,
      inStock: true,
      variants: {
        color: ["Silver", "Black", "Blue"],
        size: ["500ml", "750ml", "1000ml"]
      },
      tags: ["insulated", "double-wall", "temperature"]
    },
    {
      id: "15",
      name: "Stainless Steel Bottle",
      price: 1e3,
      category: "bottles",
      image: "https://images.unsplash.com/photo-1564090962-3b8d9e4d1e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium stainless steel bottle with leak-proof design",
      rating: 4.8,
      reviews: 92,
      inStock: true,
      variants: {
        color: ["Silver", "Black", "Gold"],
        size: ["500ml", "750ml", "1000ml"]
      },
      tags: ["stainless steel", "leak-proof", "premium"]
    },
    {
      id: "16",
      name: "Sports Bottle",
      price: 1100,
      category: "bottles",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Sports water bottle with easy-grip design",
      rating: 4.5,
      reviews: 34,
      inStock: true,
      variants: {
        color: ["Red", "Blue", "Green"],
        size: ["600ml", "800ml", "1000ml"]
      },
      tags: ["sports", "grip", "athletic"]
    },
    {
      id: "17",
      name: "Men's Leather Wallet",
      price: 1200,
      category: "gifts-him",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium genuine leather wallet with RFID protection",
      rating: 4.9,
      reviews: 124,
      inStock: true,
      variants: {
        color: ["Brown", "Black", "Tan"]
      },
      tags: ["leather", "RFID", "premium", "wallet"]
    },
    {
      id: "18",
      name: "Men's Watch",
      price: 1500,
      category: "gifts-him",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Elegant men's watch with steel bracelet",
      rating: 4.7,
      reviews: 87,
      inStock: true,
      variants: {
        color: ["Silver", "Gold", "Black"]
      },
      tags: ["watch", "elegant", "steel"]
    },
    {
      id: "19",
      name: "Perfume Set",
      price: 1800,
      category: "gifts-him",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium perfume set for men with multiple fragrances",
      rating: 4.6,
      reviews: 65,
      inStock: true,
      tags: ["perfume", "fragrance", "premium"]
    },
    {
      id: "20",
      name: "Tie Set",
      price: 2e3,
      category: "gifts-him",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Elegant tie set with cufflinks and tie clip",
      rating: 4.8,
      reviews: 43,
      inStock: true,
      variants: {
        color: ["Blue", "Red", "Black", "Gray"]
      },
      tags: ["tie", "cufflinks", "elegant"]
    },
    {
      id: "21",
      name: "Ladies' Pearl Necklace",
      price: 1500,
      category: "gifts-her",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Elegant freshwater pearl necklace with gold clasp",
      rating: 4.9,
      reviews: 156,
      inStock: true,
      variants: {
        color: ["White", "Cream", "Pink"]
      },
      tags: ["pearl", "necklace", "elegant"]
    },
    {
      id: "22",
      name: "Handbag Set",
      price: 1800,
      category: "gifts-her",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium handbag set with matching wallet",
      rating: 4.7,
      reviews: 98,
      inStock: true,
      variants: {
        color: ["Brown", "Black", "Red", "Pink"]
      },
      tags: ["handbag", "wallet", "premium"]
    },
    {
      id: "23",
      name: "Earring Set",
      price: 2e3,
      category: "gifts-her",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Beautiful earring set with multiple pairs",
      rating: 4.8,
      reviews: 72,
      inStock: true,
      variants: {
        color: ["Gold", "Silver", "Rose Gold"]
      },
      tags: ["earrings", "jewelry", "beautiful"]
    },
    {
      id: "24",
      name: "Spa Kit",
      price: 2200,
      category: "gifts-her",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Luxurious spa kit with essential oils and accessories",
      rating: 4.6,
      reviews: 84,
      inStock: true,
      tags: ["spa", "relaxation", "luxurious"]
    },
    {
      id: "25",
      name: "Family Photo Frame",
      price: 1e3,
      category: "gifts-parents",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Beautiful family photo frame with multiple slots",
      rating: 4.7,
      reviews: 118,
      inStock: true,
      variants: {
        color: ["Brown", "Black", "White", "Silver"]
      },
      tags: ["photo frame", "family", "beautiful"]
    },
    {
      id: "26",
      name: "Personalized Plaque",
      price: 1300,
      category: "gifts-parents",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Custom wooden plaque with family name and message",
      rating: 4.8,
      reviews: 95,
      inStock: true,
      variants: {
        color: ["Natural Wood", "Dark Wood", "White"]
      },
      tags: ["plaque", "personalized", "wooden"]
    },
    {
      id: "27",
      name: "Couple Mug Set",
      price: 1500,
      category: "gifts-parents",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Matching couple mug set with romantic designs",
      rating: 4.9,
      reviews: 203,
      inStock: true,
      variants: {
        color: ["White", "Red", "Pink"]
      },
      tags: ["couple", "mug set", "romantic"]
    },
    {
      id: "28",
      name: "Memory Book",
      price: 1700,
      category: "gifts-parents",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium memory book for cherished moments",
      rating: 4.6,
      reviews: 67,
      inStock: true,
      variants: {
        color: ["Brown", "Black", "Burgundy"]
      },
      tags: ["memory book", "premium", "moments"]
    },
    {
      id: "29",
      name: "Baby Rattle Set",
      price: 700,
      category: "gifts-babies",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Safe and colorful baby rattle set",
      rating: 4.8,
      reviews: 142,
      inStock: true,
      variants: {
        color: ["Multi-color", "Pastel"]
      },
      tags: ["baby", "rattle", "safe"]
    },
    {
      id: "30",
      name: "Soft Toy Bundle",
      price: 850,
      category: "gifts-babies",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Adorable soft toy bundle for babies",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      variants: {
        color: ["Pink", "Blue", "Yellow"]
      },
      tags: ["soft toy", "bundle", "adorable"]
    },
    {
      id: "31",
      name: "Baby Blanket",
      price: 950,
      category: "gifts-babies",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Soft and warm baby blanket with cute designs",
      rating: 4.9,
      reviews: 178,
      inStock: true,
      variants: {
        color: ["Pink", "Blue", "White", "Yellow"]
      },
      tags: ["baby blanket", "soft", "warm"]
    },
    {
      id: "32",
      name: "Teether Set",
      price: 1e3,
      category: "gifts-babies",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Safe silicone teether set for babies",
      rating: 4.6,
      reviews: 94,
      inStock: true,
      variants: {
        color: ["Multi-color", "Pastel"]
      },
      tags: ["teether", "silicone", "safe"]
    },
    {
      id: "33",
      name: "Couple's Mug Set",
      price: 1100,
      category: "couple",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Romantic couple's mug set with matching designs",
      rating: 4.8,
      reviews: 156,
      inStock: true,
      variants: {
        color: ["White", "Red", "Pink"]
      },
      tags: ["couple", "romantic", "matching"]
    },
    {
      id: "34",
      name: "Love Photo Frame",
      price: 1400,
      category: "couple",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Beautiful love-themed photo frame for couples",
      rating: 4.7,
      reviews: 87,
      inStock: true,
      variants: {
        color: ["Red", "Pink", "Gold", "Silver"]
      },
      tags: ["love", "photo frame", "couple"]
    },
    {
      id: "35",
      name: "Couple Keychain",
      price: 1600,
      category: "couple",
      image: "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Matching couple keychain set with romantic design",
      rating: 4.9,
      reviews: 234,
      inStock: true,
      variants: {
        color: ["Silver", "Gold", "Rose Gold"]
      },
      tags: ["couple", "keychain", "matching"]
    },
    {
      id: "36",
      name: "Heart Pendant",
      price: 1800,
      category: "couple",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Elegant heart pendant for couples",
      rating: 4.8,
      reviews: 76,
      inStock: true,
      variants: {
        color: ["Gold", "Silver", "Rose Gold"]
      },
      tags: ["heart", "pendant", "elegant"]
    },
    {
      id: "37",
      name: "Luxury Hamper",
      price: 2500,
      category: "hampers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium luxury gift hamper with assorted items",
      rating: 4.9,
      reviews: 298,
      inStock: true,
      tags: ["luxury", "hamper", "premium"]
    },
    {
      id: "38",
      name: "Deluxe Gift Box",
      price: 3e3,
      category: "hampers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Deluxe gift box with premium products",
      rating: 4.8,
      reviews: 187,
      inStock: true,
      tags: ["deluxe", "gift box", "premium"]
    },
    {
      id: "39",
      name: "Premium Hamper",
      price: 3500,
      category: "hampers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium hamper with exclusive items",
      rating: 4.7,
      reviews: 134,
      inStock: true,
      tags: ["premium", "hamper", "exclusive"]
    },
    {
      id: "40",
      name: "Elite Basket",
      price: 4e3,
      category: "hampers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Elite gift basket with luxury items",
      rating: 4.9,
      reviews: 95,
      inStock: true,
      tags: ["elite", "basket", "luxury"]
    },
    {
      id: "41",
      name: "Chocolate Flower Combo",
      price: 1300,
      category: "chocolates-flowers",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Beautiful combination of chocolates and flowers",
      rating: 4.8,
      reviews: 167,
      inStock: true,
      tags: ["chocolate", "flowers", "combo"]
    },
    {
      id: "42",
      name: "Rose & Truffle Set",
      price: 1600,
      category: "chocolates-flowers",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium roses with luxury chocolate truffles",
      rating: 4.9,
      reviews: 243,
      inStock: true,
      tags: ["rose", "truffle", "premium"]
    },
    {
      id: "43",
      name: "Flower Bouquet",
      price: 1800,
      category: "chocolates-flowers",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Fresh flower bouquet with assorted blooms",
      rating: 4.7,
      reviews: 198,
      inStock: true,
      variants: {
        color: ["Mixed", "Red", "Pink", "White"]
      },
      tags: ["flower", "bouquet", "fresh"]
    },
    {
      id: "44",
      name: "Chocolate Tower",
      price: 2e3,
      category: "chocolates-flowers",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Impressive chocolate tower with premium chocolates",
      rating: 4.8,
      reviews: 156,
      inStock: true,
      tags: ["chocolate", "tower", "premium"]
    },
    {
      id: "45",
      name: "Scented Candles",
      price: 600,
      category: "others",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Aromatic scented candles for relaxation",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      variants: {
        color: ["Vanilla", "Lavender", "Rose", "Sandalwood"]
      },
      tags: ["scented", "candles", "relaxation"]
    },
    {
      id: "46",
      name: "Jewelry Box",
      price: 1400,
      category: "others",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Elegant jewelry box with multiple compartments",
      rating: 4.7,
      reviews: 112,
      inStock: true,
      variants: {
        color: ["Brown", "Black", "Pink", "White"]
      },
      tags: ["jewelry", "box", "elegant"]
    },
    {
      id: "47",
      name: "Custom Pillow",
      price: 900,
      category: "others",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Custom printed pillow with your design",
      rating: 4.5,
      reviews: 78,
      inStock: true,
      variants: {
        color: ["White", "Beige", "Gray"],
        size: ["40x40cm", "50x50cm", "60x60cm"]
      },
      tags: ["custom", "pillow", "printed"]
    },
    {
      id: "48",
      name: "Leather Diary",
      price: 1100,
      category: "others",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Premium leather diary with personalization",
      rating: 4.8,
      reviews: 145,
      inStock: true,
      variants: {
        color: ["Brown", "Black", "Tan"]
      },
      tags: ["leather", "diary", "premium"]
    },
    {
      id: "49",
      name: "Wooden Pen Set",
      price: 1300,
      category: "others",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Elegant wooden pen set with engraving",
      rating: 4.7,
      reviews: 67,
      inStock: true,
      variants: {
        color: ["Natural", "Dark Wood", "Cherry"]
      },
      tags: ["wooden", "pen set", "elegant"]
    },
    {
      id: "50",
      name: "Glass Vase",
      price: 1500,
      category: "others",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      description: "Beautiful glass vase for home decoration",
      rating: 4.6,
      reviews: 93,
      inStock: true,
      variants: {
        color: ["Clear", "Blue", "Green", "Amber"]
      },
      tags: ["glass", "vase", "decoration"]
    }
  ]
};

// client/src/data/categories.json
var categories_default = {
  categories: [
    {
      id: "mugs",
      name: "Mugs",
      namebn: "\u09AA\u09CD\u09B0\u09BF\u09AE\u09BF\u09AF\u09BC\u09BE\u09AE \u09B8\u09BF\u09B0\u09BE\u09AE\u09BF\u0995 \u09AE\u0997",
      description: "Premium ceramic mugs with elegant designs",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 550,
      productCount: 4,
      icon: "\u2615"
    },
    {
      id: "tshirts",
      name: "T-Shirts",
      namebn: "\u0986\u09B0\u09BE\u09AE\u09A6\u09BE\u09AF\u09BC\u0995 \u099F\u09BF-\u09B6\u09BE\u09B0\u09CD\u099F",
      description: "Comfortable and stylish t-shirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 550,
      productCount: 4,
      icon: "\u{1F455}"
    },
    {
      id: "keychains",
      name: "Keychains",
      namebn: "\u09B8\u09CD\u099F\u09BE\u0987\u09B2\u09BF\u09B6 \u099A\u09BE\u09AC\u09BF\u09B0 \u099A\u09C7\u0987\u09A8",
      description: "Stylish and elegant keychains",
      image: "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 400,
      productCount: 4,
      icon: "\u{1F511}"
    },
    {
      id: "bottles",
      name: "Water Bottles",
      namebn: "\u0987\u0995\u09CB-\u09AB\u09CD\u09B0\u09C7\u09A8\u09CD\u09A1\u09B2\u09BF \u09AC\u09CB\u09A4\u09B2",
      description: "Eco-friendly and insulated water bottles",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 800,
      productCount: 4,
      icon: "\u{1F4A7}"
    },
    {
      id: "gifts-him",
      name: "Gift for Him",
      namebn: "\u09B8\u09CD\u09AA\u09C7\u09B6\u09BE\u09B2",
      description: "Special gifts for men",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 1200,
      productCount: 4,
      icon: "\u{1F381}"
    },
    {
      id: "gifts-her",
      name: "Gift for Her",
      namebn: "\u098F\u0995\u09CD\u09B8\u0995\u09CD\u09B2\u09C1\u09B8\u09BF\u09AD",
      description: "Exclusive gifts for women",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 1500,
      productCount: 4,
      icon: "\u{1F49D}"
    },
    {
      id: "gifts-parents",
      name: "Gift for Parents",
      namebn: "\u09AD\u09BE\u09B2\u09CB\u09AC\u09BE\u09B8\u09BE",
      description: "Loving gifts for parents",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 1e3,
      productCount: 4,
      icon: "\u2764\uFE0F"
    },
    {
      id: "gifts-babies",
      name: "Gifts for Babies",
      namebn: "\u09B8\u09C7\u09AB",
      description: "Safe and adorable gifts for babies",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 700,
      productCount: 4,
      icon: "\u{1F37C}"
    },
    {
      id: "couple",
      name: "For Couple",
      namebn: "\u09B0\u09CB\u09AE\u09BE\u09A8\u09CD\u099F\u09BF\u0995",
      description: "Romantic gifts for couples",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 1100,
      productCount: 4,
      icon: "\u{1F491}"
    },
    {
      id: "hampers",
      name: "Premium Luxury Gift Hampers",
      namebn: "\u09B2\u09BE\u0995\u09CD\u09B8\u09BE\u09B0\u09BF",
      description: "Luxury gift hampers with premium items",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 2500,
      productCount: 4,
      icon: "\u{1F381}"
    },
    {
      id: "chocolates-flowers",
      name: "Chocolates & Flowers",
      namebn: "\u09B0\u09CB\u09AE\u09BE\u09A8\u09CD\u099F\u09BF\u0995",
      description: "Romantic chocolates and flowers",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      startingPrice: 1300,
      productCount: 4,
      icon: "\u{1F36B}\u{1F339}"
    }
  ]
};

// client/src/data/testimonials.json
var testimonials_default = {
  testimonials: [
    {
      id: "1",
      name: "Ahmed Rahman",
      location: "Dhaka, Bangladesh",
      rating: 5,
      comment: "Amazing quality products! The personalized mug I ordered was exactly what I wanted. Fast delivery and excellent customer service. Highly recommend TryneX!",
      avatar: "A",
      date: "2025-01-15"
    },
    {
      id: "2",
      name: "Fatima Begum",
      location: "Chittagong, Bangladesh",
      rating: 5,
      comment: "Perfect gift for my husband! The personalized keychain was beautifully crafted and he loved it. The packaging was also very elegant.",
      avatar: "F",
      date: "2025-01-10"
    },
    {
      id: "3",
      name: "Mehedi Hasan",
      location: "Sylhet, Bangladesh",
      rating: 4,
      comment: "Great customer service and fast delivery. The premium gift hamper was perfect for our anniversary. Will definitely order again!",
      avatar: "M",
      date: "2025-01-08"
    },
    {
      id: "4",
      name: "Rashida Khatun",
      location: "Rajshahi, Bangladesh",
      rating: 5,
      comment: "The pearl necklace is absolutely gorgeous! The quality exceeded my expectations. TryneX has become my go-to for premium gifts.",
      avatar: "R",
      date: "2025-01-05"
    },
    {
      id: "5",
      name: "Karim Uddin",
      location: "Barisal, Bangladesh",
      rating: 4,
      comment: "Excellent product quality and reasonable prices. The leather wallet is premium quality and the delivery was on time.",
      avatar: "K",
      date: "2025-01-03"
    },
    {
      id: "6",
      name: "Shahida Begum",
      location: "Khulna, Bangladesh",
      rating: 5,
      comment: "Wonderful experience shopping at TryneX. The t-shirt quality is outstanding and the customer support is very helpful.",
      avatar: "S",
      date: "2025-01-01"
    }
  ]
};

// server/supabase.ts
import { createClient } from "@supabase/supabase-js";
var supabaseUrl = process.env.SUPABASE_URL || "https://wifsqonbnfmwtqvupqbk.supabase.co";
var supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZnNxb25ibmZtd3RxdnVwcWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1ODAyNjMsImV4cCI6MjA2NzE1NjI2M30.A7o3vhEaNZb9lmViHA_KQrwzKJTBWpsD6KbHqkkput0";
var supabase = createClient(supabaseUrl, supabaseKey);
var SupabaseStorage = class {
  orderIdCounter = 1;
  constructor() {
    this.initializeDatabase();
  }
  async initializeDatabase() {
    try {
      const { data: products } = await supabase.from("products").select("id").limit(1);
      console.log("Supabase connected successfully");
    } catch (error) {
      console.log("Supabase tables may need to be created via dashboard");
    }
  }
  generateOrderId() {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const counter = String(this.orderIdCounter++).padStart(3, "0");
    return `TXR-${year}${month}${day}-${counter}`;
  }
  // Products
  async getProducts() {
    try {
      const { data, error } = await supabase.from("products").select("*").order("id");
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  async getProductById(id) {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) throw error;
      return data || void 0;
    } catch (error) {
      console.error("Error fetching product:", error);
      return void 0;
    }
  }
  async getProductsByCategory(category) {
    try {
      const { data, error } = await supabase.from("products").select("*").eq("category", category).order("id");
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }
  }
  async searchProducts(query) {
    try {
      const { data, error } = await supabase.from("products").select("*").or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`).order("id");
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  }
  // Categories
  async getCategories() {
    try {
      const { data, error } = await supabase.from("categories").select("*").order("id");
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }
  async getCategoryById(id) {
    try {
      const { data, error } = await supabase.from("categories").select("*").eq("id", id).single();
      if (error) throw error;
      return data || void 0;
    } catch (error) {
      console.error("Error fetching category:", error);
      return void 0;
    }
  }
  // Orders
  async createOrder(orderData) {
    try {
      const order = {
        ...orderData,
        id: this.generateOrderId(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await supabase.from("orders").insert([order]).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }
  async getOrderById(id) {
    try {
      const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();
      if (error) throw error;
      return data || void 0;
    } catch (error) {
      console.error("Error fetching order:", error);
      return void 0;
    }
  }
  async updateOrderStatus(id, status) {
    try {
      const { data, error } = await supabase.from("orders").update({
        status,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", id).select().single();
      if (error) throw error;
      return data || void 0;
    } catch (error) {
      console.error("Error updating order status:", error);
      return void 0;
    }
  }
  // Promo Codes
  async getPromoCodes() {
    try {
      const { data, error } = await supabase.from("promo_codes").select("*").eq("isActive", true).order("code");
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching promo codes:", error);
      return [];
    }
  }
  async validatePromoCode(code) {
    try {
      const { data, error } = await supabase.from("promo_codes").select("*").eq("code", code).eq("isActive", true).gt("expiryDate", (/* @__PURE__ */ new Date()).toISOString()).single();
      if (error) throw error;
      return data || void 0;
    } catch (error) {
      console.error("Error validating promo code:", error);
      return void 0;
    }
  }
  // Testimonials
  async getTestimonials() {
    try {
      const { data, error } = await supabase.from("testimonials").select("*").order("id");
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return [];
    }
  }
  // Blog Posts
  async getBlogPosts() {
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
  }
  async getBlogPostBySlug(slug) {
    try {
      const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).single();
      if (error) throw error;
      return data || void 0;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return void 0;
    }
  }
};

// server/storage.ts
var MemStorage = class {
  products;
  categories;
  orders;
  promoCodes;
  testimonials;
  blogPosts;
  orderIdCounter;
  constructor() {
    this.products = products_default.products;
    this.categories = categories_default.categories;
    this.orders = /* @__PURE__ */ new Map();
    this.testimonials = testimonials_default.testimonials;
    this.orderIdCounter = 1;
    this.initializeSampleData();
  }
  initializeSampleData() {
    this.promoCodes = [
      {
        code: "WELCOME10",
        discount: 10,
        type: "percentage",
        minAmount: 500,
        maxDiscount: 500,
        expiryDate: "2025-12-31",
        usageLimit: 100,
        isActive: true
      },
      {
        code: "FLAT50",
        discount: 50,
        type: "fixed",
        minAmount: 1e3,
        expiryDate: "2025-06-30",
        usageLimit: 50,
        isActive: true
      },
      {
        code: "FLASH25",
        discount: 25,
        type: "percentage",
        minAmount: 800,
        maxDiscount: 1e3,
        expiryDate: "2025-02-28",
        usageLimit: 200,
        isActive: true
      }
    ];
    this.blogPosts = [
      {
        id: "1",
        title: "The Ultimate Gift Guide for Every Occasion",
        excerpt: "Discover the perfect gifts for birthdays, anniversaries, and special celebrations.",
        content: "Full content would go here...",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "TryneX Team",
        date: "2025-01-15",
        tags: ["Gift Guide", "Special Occasions", "Shopping Tips"],
        slug: "ultimate-gift-guide-every-occasion"
      },
      {
        id: "2",
        title: "Why Personalized Gifts Make the Best Memories",
        excerpt: "Learn about the psychology behind personalized gifts and how they create lasting emotional connections.",
        content: "Full content would go here...",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Sarah Ahmed",
        date: "2025-01-12",
        tags: ["Personalization", "Psychology", "Emotions"],
        slug: "personalized-gifts-best-memories"
      },
      {
        id: "3",
        title: "How to Care for Your Premium Products",
        excerpt: "Essential tips for maintaining the quality and longevity of your premium items.",
        content: "Full content would go here...",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Mehdi Hassan",
        date: "2025-01-10",
        tags: ["Care Tips", "Maintenance", "Quality"],
        slug: "care-for-premium-products"
      }
    ];
    const sampleOrder = {
      id: this.generateOrderId(),
      items: [],
      total: 1250,
      subtotal: 1150,
      deliveryFee: 80,
      discount: 0,
      customerInfo: {
        name: "Ahmed Hassan",
        email: "ahmed@example.com",
        phone: "01712345678",
        address: "Dhanmondi, Dhaka"
      },
      orderMethod: "direct",
      paymentMethod: "bkash",
      status: "delivered",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.orders.set(sampleOrder.id, sampleOrder);
  }
  generateOrderId() {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const counter = String(this.orderIdCounter++).padStart(3, "0");
    return `TXR-${year}${month}${day}-${counter}`;
  }
  // Products
  async getProducts() {
    return this.products;
  }
  async getProductById(id) {
    return this.products.find((product) => product.id === id);
  }
  async getProductsByCategory(category) {
    return this.products.filter((product) => product.category === category);
  }
  async searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return this.products.filter(
      (product) => product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm) || product.category.toLowerCase().includes(searchTerm) || product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }
  // Categories
  async getCategories() {
    return this.categories;
  }
  async getCategoryById(id) {
    return this.categories.find((category) => category.id === id);
  }
  // Orders
  async createOrder(orderData) {
    const order = {
      ...orderData,
      id: this.generateOrderId(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.orders.set(order.id, order);
    return order;
  }
  async getOrderById(id) {
    return this.orders.get(id);
  }
  async updateOrderStatus(id, status) {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
      order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      this.orders.set(id, order);
      return order;
    }
    return void 0;
  }
  // Promo Codes
  async getPromoCodes() {
    return this.promoCodes.filter((code) => code.isActive);
  }
  async validatePromoCode(code) {
    const promoCode = this.promoCodes.find(
      (promo) => promo.code === code && promo.isActive && new Date(promo.expiryDate) > /* @__PURE__ */ new Date()
    );
    return promoCode;
  }
  // Testimonials
  async getTestimonials() {
    return this.testimonials;
  }
  // Blog Posts
  async getBlogPosts() {
    return this.blogPosts;
  }
  async getBlogPostBySlug(slug) {
    return this.blogPosts.find((post) => post.slug === slug);
  }
};
var storage = process.env.NODE_ENV === "production" ? new SupabaseStorage() : new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  app2.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
  app2.get("/api/products/category/:category", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });
  app2.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  app2.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const order = await storage.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  });
  app2.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });
  app2.put("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  });
  app2.get("/api/promo-codes", async (req, res) => {
    try {
      const promoCodes = await storage.getPromoCodes();
      res.json(promoCodes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch promo codes" });
    }
  });
  app2.post("/api/promo-codes/validate", async (req, res) => {
    try {
      const { code } = req.body;
      const promoCode = await storage.validatePromoCode(code);
      if (!promoCode) {
        return res.status(404).json({ error: "Invalid promo code" });
      }
      res.json(promoCode);
    } catch (error) {
      res.status(500).json({ error: "Failed to validate promo code" });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });
  app2.get("/api/blog", async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/:slug", async (req, res) => {
    try {
      const blogPost = await storage.getBlogPostBySlug(req.params.slug);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      res.json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;
      res.json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      res.status(500).json({ error: "Failed to subscribe to newsletter" });
    }
  });
  app2.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ error: "Search query is required" });
      }
      const products = await storage.searchProducts(q.toString());
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to search products" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

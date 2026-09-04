export const categories = [
  { name: "New Born", slug: "new-born", type: "age", ageRange: "0-3 Months", sortOrder: 1 },
  { name: "Baby Boy", slug: "baby-boy", type: "age", ageRange: "0-2 Years", sortOrder: 2 },
  { name: "Baby Girl", slug: "baby-girl", type: "age", ageRange: "0-2 Years", sortOrder: 3 },
  { name: "Boy", slug: "boy", type: "age", ageRange: "2-10 Years", sortOrder: 4 },
  { name: "Girl", slug: "girl", type: "age", ageRange: "2-12 Years", sortOrder: 5 },
  { name: "Footwear", slug: "footwear", type: "type", ageRange: null, sortOrder: 6 },
  { name: "Accessories", slug: "accessories", type: "type", ageRange: null, sortOrder: 7 },
  { name: "Sale", slug: "sale", type: "type", ageRange: null, sortOrder: 8 },
];

export const promos = [
  {
    title: "40% off sneakers",
    subtitle: "Limited sizes left",
    discountText: "-40%",
    ctaText: "Shop footwear",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    isActive: 1,
    sortOrder: 1
  },
  {
    title: "Autumn rompers",
    subtitle: "New season styles",
    discountText: null,
    ctaText: "Explore rompers",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=80",
    isActive: 1,
    sortOrder: 2
  },
  {
    title: "Party dresses",
    subtitle: "For every little occasion",
    discountText: null,
    ctaText: "View collection",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=80",
    isActive: 1,
    sortOrder: 3
  },
];

export const products = [
  {
    title: "Chicco Full Romper, Vehicles Print",
    slug: "chicco-full-romper-vehicles-print",
    category: "baby-boy",
    gender: "baby-boy",
    price: 1790,
    originalPrice: null,
    discountPercent: 0,
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["0-3m", "3-6m", "6-12m", "1-2y"],
    stock: 24,
    rating: 4.8,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Chicco Full Romper, Lion Face Print",
    slug: "chicco-full-romper-lion-face-print",
    category: "baby-boy",
    gender: "baby-boy",
    price: 1790,
    originalPrice: null,
    discountPercent: 0,
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["0-3m", "3-6m", "6-12m", "1-2y"],
    stock: 18,
    rating: 4.7,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Tulle Party Dress, Blush Pink",
    slug: "tulle-party-dress-blush-pink",
    category: "baby-girl",
    gender: "baby-girl",
    price: 3290,
    originalPrice: 4990,
    discountPercent: 34,
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["6-12m", "1-2y", "2-3y"],
    stock: 12,
    rating: 4.9,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "Ruffle Sleeve Cotton Romper",
    slug: "ruffle-sleeve-cotton-romper",
    category: "baby-girl",
    gender: "baby-girl",
    price: 2190,
    originalPrice: null,
    discountPercent: 0,
    images: [
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["0-3m", "3-6m", "6-12m"],
    stock: 20,
    rating: 4.6,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Formal Waistcoat Gallis Suit",
    slug: "formal-waistcoat-gallis-suit",
    category: "boy",
    gender: "boy",
    price: 4590,
    originalPrice: 6990,
    discountPercent: 34,
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["2-3y", "4-5y", "6-7y"],
    stock: 9,
    rating: 4.9,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "Striped Henley Sweatshirt",
    slug: "striped-henley-sweatshirt",
    category: "boy",
    gender: "boy",
    price: 1990,
    originalPrice: null,
    discountPercent: 0,
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["2-3y", "4-5y", "6-7y", "8-9y"],
    stock: 30,
    rating: 4.5,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Pleated Sundress, Sage Green",
    slug: "pleated-sundress-sage-green",
    category: "girl",
    gender: "girl",
    price: 2890,
    originalPrice: 3990,
    discountPercent: 28,
    images: [
      "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["2-3y", "4-5y", "6-7y"],
    stock: 15,
    rating: 4.8,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "Floral Print Cotton Frock",
    slug: "floral-print-cotton-frock",
    category: "girl",
    gender: "girl",
    price: 2390,
    originalPrice: null,
    discountPercent: 0,
    images: [
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["2-3y", "4-5y", "6-7y", "8-9y"],
    stock: 22,
    rating: 4.7,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "CT Baby Girl Brown Rainbow Boots",
    slug: "ct-baby-girl-brown-rainbow-boots",
    category: "footwear",
    gender: "baby-girl",
    price: 2994,
    originalPrice: 4990,
    discountPercent: 40,
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["19", "20", "21", "22"],
    stock: 11,
    rating: 4.8,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "All In Motion Peach Slip-On Sneakers",
    slug: "all-in-motion-peach-slip-on-sneakers",
    category: "footwear",
    gender: "girl",
    price: 3594,
    originalPrice: 5990,
    discountPercent: 40,
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["24", "25", "26", "27"],
    stock: 14,
    rating: 4.6,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "C&J Girl Pink Belt Slip-On Sneakers",
    slug: "cj-girl-pink-belt-slip-on-sneakers",
    category: "footwear",
    gender: "girl",
    price: 2994,
    originalPrice: 4990,
    discountPercent: 40,
    images: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["25", "26", "27", "28"],
    stock: 17,
    rating: 4.7,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "C&J Boy Grey Slip-On Sneakers",
    slug: "cj-boy-grey-slip-on-sneakers",
    category: "footwear",
    gender: "boy",
    price: 2994,
    originalPrice: 4990,
    discountPercent: 40,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["26", "27", "28", "29"],
    stock: 13,
    rating: 4.6,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "Carter's Newborn 3-Piece Kimono Bodysuit Set",
    slug: "carters-newborn-3pc-kimono-bodysuit-set",
    category: "new-born",
    gender: "new-born",
    price: 2490,
    originalPrice: 3200,
    discountPercent: 22,
    images: [
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["NB", "0-3m"],
    stock: 25,
    rating: 4.9,
    isNewArrival: 1,
    isFeatured: 1
  },
  {
    title: "Organic Cotton Swaddle & Beanie Sleep Set",
    slug: "organic-cotton-swaddle-beanie-sleep-set",
    category: "new-born",
    gender: "new-born",
    price: 1890,
    originalPrice: null,
    discountPercent: 0,
    images: [
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["0-3m"],
    stock: 30,
    rating: 4.8,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Pastel Cloud Sleepsuit with Scratch Mittens",
    slug: "pastel-cloud-sleepsuit-scratch-mittens",
    category: "new-born",
    gender: "new-born",
    price: 1690,
    originalPrice: 2190,
    discountPercent: 23,
    images: [
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["0-3m", "3-6m"],
    stock: 18,
    rating: 4.7,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Dino Adventure Shortall Dungaree Set",
    slug: "dino-adventure-shortall-dungaree-set",
    category: "baby-boy",
    gender: "baby-boy",
    price: 2590,
    originalPrice: 3490,
    discountPercent: 26,
    images: [
      "https://images.unsplash.com/photo-1471286174890-9c112ffca564?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["3-6m", "6-12m", "1-2y"],
    stock: 22,
    rating: 4.8,
    isNewArrival: 1,
    isFeatured: 1
  },
  {
    title: "Polo Collar Knitted Cardigan & Pant Set",
    slug: "polo-collar-knitted-cardigan-pant-set",
    category: "baby-boy",
    gender: "baby-boy",
    price: 3490,
    originalPrice: 4890,
    discountPercent: 29,
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["6-12m", "1-2y", "2-3y"],
    stock: 15,
    rating: 4.9,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "Sailor Stripe Summer Cotton Romper",
    slug: "sailor-stripe-summer-cotton-romper",
    category: "baby-boy",
    gender: "baby-boy",
    price: 1690,
    originalPrice: null,
    discountPercent: 0,
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["0-3m", "3-6m", "6-12m"],
    stock: 28,
    rating: 4.6,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Floral Eyelet Lace Bubble Romper",
    slug: "floral-eyelet-lace-bubble-romper",
    category: "baby-girl",
    gender: "baby-girl",
    price: 2290,
    originalPrice: 2990,
    discountPercent: 23,
    images: [
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["3-6m", "6-12m", "1-2y"],
    stock: 20,
    rating: 4.9,
    isNewArrival: 1,
    isFeatured: 1
  },
  {
    title: "Buttercup Yellow Smocked Party Frock",
    slug: "buttercup-yellow-smocked-party-frock",
    category: "baby-girl",
    gender: "baby-girl",
    price: 2890,
    originalPrice: 3890,
    discountPercent: 26,
    images: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["6-12m", "1-2y", "2-3y"],
    stock: 14,
    rating: 4.8,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "Pastel Rainbow Ribbed 2-Piece Lounge Set",
    slug: "pastel-rainbow-ribbed-2pc-lounge-set",
    category: "baby-girl",
    gender: "baby-girl",
    price: 2190,
    originalPrice: null,
    discountPercent: 0,
    images: [
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["3-6m", "6-12m", "1-2y"],
    stock: 25,
    rating: 4.7,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Urban Explorer Cargo Joggers & Hoodie Set",
    slug: "urban-explorer-cargo-joggers-hoodie-set",
    category: "boy",
    gender: "boy",
    price: 3990,
    originalPrice: 5490,
    discountPercent: 27,
    images: [
      "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["3-4y", "5-6y", "7-8y", "9-10y"],
    stock: 16,
    rating: 4.8,
    isNewArrival: 1,
    isFeatured: 1
  },
  {
    title: "Varsity Graphic Cotton Bomber Jacket",
    slug: "varsity-graphic-cotton-bomber-jacket",
    category: "boy",
    gender: "boy",
    price: 3490,
    originalPrice: 4990,
    discountPercent: 30,
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["4-5y", "6-7y", "8-9y"],
    stock: 12,
    rating: 4.9,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "Plaid Flannel Button-Down Shirt",
    slug: "plaid-flannel-button-down-shirt",
    category: "boy",
    gender: "boy",
    price: 2190,
    originalPrice: null,
    discountPercent: 0,
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["2-3y", "4-5y", "6-7y", "8-9y"],
    stock: 24,
    rating: 4.6,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Embroidered Peplum Kurti & Tulip Shalwar Set",
    slug: "embroidered-peplum-kurti-tulip-shalwar-set",
    category: "girl",
    gender: "girl",
    price: 4290,
    originalPrice: 5990,
    discountPercent: 28,
    images: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["3-4y", "5-6y", "7-8y", "9-10y"],
    stock: 15,
    rating: 4.9,
    isNewArrival: 1,
    isFeatured: 1
  },
  {
    title: "Sparkle Star Mesh Party Dress, Lavender",
    slug: "sparkle-star-mesh-party-dress-lavender",
    category: "girl",
    gender: "girl",
    price: 3790,
    originalPrice: 4990,
    discountPercent: 24,
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["3-4y", "5-6y", "7-8y"],
    stock: 10,
    rating: 4.8,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "Ribbed Knit Cardigan with Pearl Buttons",
    slug: "ribbed-knit-cardigan-pearl-buttons",
    category: "girl",
    gender: "girl",
    price: 2690,
    originalPrice: 3490,
    discountPercent: 23,
    images: [
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["4-5y", "6-7y", "8-9y", "10-11y"],
    stock: 19,
    rating: 4.7,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Light-Up LED Athletic Runners, Blue/Lime",
    slug: "light-up-led-athletic-runners-blue-lime",
    category: "footwear",
    gender: "boy",
    price: 3890,
    originalPrice: 5490,
    discountPercent: 29,
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["25", "26", "27", "28", "29"],
    stock: 16,
    rating: 4.9,
    isNewArrival: 1,
    isFeatured: 1
  },
  {
    title: "Bow-Accent Ballerina Flats, Rose Gold",
    slug: "bow-accent-ballerina-flats-rose-gold",
    category: "footwear",
    gender: "girl",
    price: 2790,
    originalPrice: 3990,
    discountPercent: 30,
    images: [
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["23", "24", "25", "26", "27"],
    stock: 14,
    rating: 4.8,
    isNewArrival: 0,
    isFeatured: 1
  },
  {
    title: "Breathable Mesh Toddler Crib Shoes",
    slug: "breathable-mesh-toddler-crib-shoes",
    category: "footwear",
    gender: "baby-boy",
    price: 1990,
    originalPrice: 2690,
    discountPercent: 26,
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["18", "19", "20", "21"],
    stock: 20,
    rating: 4.7,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Silicone Waterproof Bibs 2-Pack, Pastel",
    slug: "silicone-waterproof-bibs-2pk-pastel",
    category: "accessories",
    gender: "new-born",
    price: 1290,
    originalPrice: 1790,
    discountPercent: 28,
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["Free Size"],
    stock: 40,
    rating: 4.9,
    isNewArrival: 1,
    isFeatured: 0
  },
  {
    title: "Organic Cotton Knotted Headbands 3-Pack",
    slug: "organic-cotton-knotted-headbands-3pk",
    category: "accessories",
    gender: "baby-girl",
    price: 1190,
    originalPrice: 1590,
    discountPercent: 25,
    images: [
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80"
    ],
    sizes: ["0-2y"],
    stock: 35,
    rating: 4.8,
    isNewArrival: 0,
    isFeatured: 1
  },
];

export function seedDatabase(rawDb) {
  const insertCategory = rawDb.prepare(
    `INSERT OR IGNORE INTO categories (name, slug, type, ageRange, sortOrder)
     VALUES (@name, @slug, @type, @ageRange, @sortOrder)`
  );
  const insertPromo = rawDb.prepare(
    `INSERT OR IGNORE INTO promos (id, title, subtitle, discountText, ctaText, isActive, sortOrder)
     VALUES (@id, @title, @subtitle, @discountText, @ctaText, @isActive, @sortOrder)`
  );
  const insertProduct = rawDb.prepare(
    `INSERT OR IGNORE INTO products
      (title, slug, category, gender, price, originalPrice, discountPercent, images, sizes, stock, rating, isNewArrival, isFeatured)
     VALUES
      (@title, @slug, @category, @gender, @price, @originalPrice, @discountPercent, @images, @sizes, @stock, @rating, @isNewArrival, @isFeatured)`
  );

  for (const c of categories) insertCategory.run(c);
  for (let i = 0; i < promos.length; i++) {
    const p = promos[i];
    insertPromo.run({
      id: i + 1,
      title: p.title,
      subtitle: p.subtitle,
      discountText: p.discountText,
      ctaText: p.ctaText,
      isActive: p.isActive,
      sortOrder: p.sortOrder,
    });
  }
  for (const p of products) {
    insertProduct.run({ ...p, images: JSON.stringify(p.images), sizes: JSON.stringify(p.sizes) });
  }
}

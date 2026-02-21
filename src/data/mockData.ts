import catBeverages from "@/assets/cat-beverages.jpg";
import catRestaurants from "@/assets/cat-restaurants.jpg";
import catMealkits from "@/assets/cat-mealkits.jpg";
import catOrderin from "@/assets/cat-orderin.jpg";
import catGoodies from "@/assets/cat-goodies.jpg";
import catGrocery from "@/assets/cat-grocery.jpg";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: string[];
  hidden?: boolean;
}

export interface ProductOption {
  id: string;
  title: string;
  description: string;
  points: number;
  requiresDate?: boolean;
}

export interface Review {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  categoryId: string;
  subcategory: string;
  points: number;
  image: string;
  images?: string[];
  description: string;
  productCode: string;
  modelNumber?: string;
  deliveryInfo: string;
  cancellationPolicy: string;
  badges: ("top" | "new" | "discount" | "bestselling")[];
  alert?: string;
  type?: "standard" | "multi-option" | "experience";
  options?: ProductOption[];
  // Experience fields
  overview?: string;
  inclusions?: string[];
  additionalInfo?: string;
  experiencePolicies?: string;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: ProductOption;
  selectedDate?: string;
}

export interface Order {
  id: string;
  date: string;
  products: { name: string; quantity: number }[];
  totalPoints: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export const categories: Category[] = [
  { id: "beverages", name: "Beverages", slug: "beverages", image: catBeverages, subcategories: ["Coffee", "Tea", "Juices", "Smoothies", "Cocktail Kits"] },
  { id: "restaurants", name: "Restaurants", slug: "restaurants", image: catRestaurants, subcategories: ["Fine Dining", "Casual Dining", "Fast Casual", "Steakhouses", "Seafood"] },
  { id: "meal-kits", name: "Meal Kits", slug: "meal-kits", image: catMealkits, subcategories: ["Family Meals", "Single Servings", "Vegetarian", "International", "Quick & Easy"] },
  { id: "order-in", name: "Order In", slug: "order-in", image: catOrderin, subcategories: ["Pizza", "Asian", "Mexican", "Italian", "Healthy"] },
  { id: "goodies", name: "Goodies", slug: "goodies", image: catGoodies, subcategories: ["Chocolates", "Cookies", "Gift Boxes", "Candy", "Pastries"] },
  { id: "grocery", name: "Grocery", slug: "grocery", image: catGrocery, subcategories: ["Fresh Produce", "Dairy", "Bakery", "Pantry", "Organic"], hidden: true },
];

export const products: Product[] = [
  // Beverages
  { id: "bev-1", name: "Premium Cold Brew Collection", brand: "Artisan Coffee Co.", categoryId: "beverages", subcategory: "Coffee", points: 2500, image: catBeverages, description: "A curated set of 6 premium cold brew bottles with unique flavor profiles.", productCode: "BIW-1001", deliveryInfo: "Ships within 3-5 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["top", "bestselling"] },
  { id: "bev-2", name: "Organic Matcha Tea Set", brand: "ZenLeaf", categoryId: "beverages", subcategory: "Tea", points: 1800, image: catBeverages, description: "Ceremonial-grade matcha with bamboo whisk and bowl.", productCode: "BIW-1002", deliveryInfo: "Ships within 2-4 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["new"] },
  { id: "bev-3", name: "Fresh Juice Cleanse Pack", brand: "VitaPress", categoryId: "beverages", subcategory: "Juices", points: 3200, image: catBeverages, description: "5-day juice cleanse with 15 cold-pressed bottles.", productCode: "BIW-1003", deliveryInfo: "Ships within 1-2 business days", cancellationPolicy: "Non-refundable", badges: ["discount"], alert: "Perishable item – delivery days may be limited." },

  // Restaurants – Experience type
  { 
    id: "rest-1", name: "$100 Fine Dining Experience", brand: "Le Gourmet", categoryId: "restaurants", subcategory: "Fine Dining", points: 5000, image: catRestaurants, 
    description: "An unforgettable multi-course dining experience at one of the city's top restaurants.", 
    productCode: "BIW-2001", deliveryInfo: "E-voucher delivered via email", cancellationPolicy: "72 hours cancellation policy", badges: ["top"],
    type: "experience",
    overview: "Indulge in a luxurious multi-course meal curated by award-winning chefs. Your evening begins with a champagne reception, followed by a 5-course tasting menu featuring seasonal ingredients sourced from local farms.",
    inclusions: ["5-course tasting menu", "Champagne reception", "Sommelier wine pairing", "Complimentary valet parking", "Personalized menu card"],
    additionalInfo: "Dress code: Smart casual. Please inform us of any dietary restrictions at least 48 hours in advance. Valid for parties of up to 4 guests.",
    experiencePolicies: "Reservations must be made at least 7 days in advance. Free cancellation up to 72 hours before the reservation. Late arrivals may result in a modified menu. Gift vouchers are valid for 12 months from date of purchase.",
    reviews: [
      { author: "Sarah M.", rating: 5, date: "2026-02-10", comment: "Absolutely stunning experience! Every course was a work of art." },
      { author: "James T.", rating: 4, date: "2026-01-28", comment: "Great food and atmosphere. Wine pairing was excellent." },
      { author: "Emily R.", rating: 5, date: "2026-01-15", comment: "Best dining experience we've ever had. Worth every point!" },
    ]
  },
  { 
    id: "rest-2", name: "Steakhouse Gift Card $50", brand: "Prime Cuts", categoryId: "restaurants", subcategory: "Steakhouses", points: 2800, image: catRestaurants, 
    description: "Gift card redeemable at all Prime Cuts locations.", productCode: "BIW-2002", deliveryInfo: "E-voucher delivered via email", cancellationPolicy: "No cancellation after purchase", badges: ["bestselling"] 
  },

  // Multi-option products
  {
    id: "exp-disney", name: "Disneyland Resort", brand: "Disney", categoryId: "restaurants", subcategory: "Fine Dining", points: 8000, image: catRestaurants,
    description: "Experience the magic of Disneyland with multiple ticket options for adults and children.",
    productCode: "BIW-2010", deliveryInfo: "E-tickets delivered via email within 24 hours", cancellationPolicy: "Free cancellation up to 7 days before visit date",
    badges: ["top", "bestselling"],
    type: "multi-option",
    overview: "Step into a world of wonder at the Disneyland Resort. Choose from multiple park and duration options to create your perfect magical getaway.",
    inclusions: ["Park admission", "Access to all rides and attractions", "Entertainment and parades", "Mobile app with wait times"],
    additionalInfo: "Children under 3 enter free. Parking available for an additional fee. Food and beverages not included unless specified.",
    experiencePolicies: "Tickets are date-specific. Free cancellation and full refund up to 7 days before your selected visit date. Same-day cancellations are non-refundable.",
    options: [
      { id: "disney-1day-1park-adult", title: "1 Day – 1 Park (Adult)", description: "Single day admission to one park", points: 8000, requiresDate: true },
      { id: "disney-1day-1park-child", title: "1 Day – 1 Park (Child 3-9)", description: "Single day admission for children aged 3-9", points: 6500, requiresDate: true },
      { id: "disney-1day-hopper-adult", title: "1 Day – Park Hopper (Adult)", description: "Visit both parks in one day", points: 12000, requiresDate: true },
      { id: "disney-2day-1park-adult", title: "2 Day – 1 Park (Adult)", description: "Two-day admission to one park per day", points: 14000, requiresDate: true },
    ],
    reviews: [
      { author: "Mike D.", rating: 5, date: "2026-02-05", comment: "Magical experience for the whole family!" },
      { author: "Lisa K.", rating: 4, date: "2026-01-20", comment: "Great value for points. Kids loved it." },
    ]
  },
  {
    id: "exp-universal", name: "Universal Studios", brand: "Universal", categoryId: "restaurants", subcategory: "Casual Dining", points: 7500, image: catRestaurants,
    description: "Thrilling rides, shows, and attractions at Universal Studios theme parks.",
    productCode: "BIW-2011", deliveryInfo: "E-tickets delivered via email within 24 hours", cancellationPolicy: "Free cancellation up to 5 days before visit date",
    badges: ["top", "new"],
    type: "multi-option",
    overview: "Experience world-class theme parks with thrilling rides based on your favorite movies and shows. From Harry Potter to Jurassic World, adventure awaits.",
    inclusions: ["Park admission", "All rides and attractions", "Live shows and entertainment", "Universal app access"],
    additionalInfo: "Express passes available for purchase separately. Some attractions have height requirements.",
    experiencePolicies: "Tickets are date-specific. Free cancellation up to 5 days before visit date. Partial refunds available for cancellations within 5 days.",
    options: [
      { id: "uni-1day-adult", title: "1 Day – General Admission (Adult)", description: "Full day access to one park", points: 7500, requiresDate: true },
      { id: "uni-1day-child", title: "1 Day – General Admission (Child 3-9)", description: "Full day access for children aged 3-9", points: 5500, requiresDate: true },
      { id: "uni-2day-adult", title: "2 Day – Park-to-Park (Adult)", description: "Two-day access to all parks", points: 13000, requiresDate: true },
      { id: "uni-express-addon", title: "Express Pass Add-On", description: "Skip the lines on select attractions", points: 4000 },
    ],
    reviews: [
      { author: "Tom H.", rating: 5, date: "2026-02-12", comment: "Harry Potter World alone is worth it!" },
      { author: "Amy S.", rating: 5, date: "2026-01-30", comment: "Best theme park experience ever." },
    ]
  },

  // Meal Kits
  { id: "mk-1", name: "Italian Date Night Kit", brand: "Chef's Table", categoryId: "meal-kits", subcategory: "International", points: 3500, image: catMealkits, description: "Everything you need for a romantic Italian dinner for two.", productCode: "BIW-3001", deliveryInfo: "Ships within 2-3 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["top", "new"] },
  { id: "mk-2", name: "Veggie Power Box", brand: "GreenChef", categoryId: "meal-kits", subcategory: "Vegetarian", points: 2200, image: catMealkits, description: "3 complete vegetarian meals with fresh ingredients.", productCode: "BIW-3002", deliveryInfo: "Ships within 2-3 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["new"] },

  // Order In
  { id: "oi-1", name: "Family Pizza Night Bundle", brand: "Napoli Express", categoryId: "order-in", subcategory: "Pizza", points: 2000, image: catOrderin, description: "2 large pizzas, garlic bread, and a dessert.", productCode: "BIW-4001", deliveryInfo: "Same-day delivery", cancellationPolicy: "Free cancellation up to 1 hour before delivery", badges: ["bestselling"] },
  { id: "oi-2", name: "Sushi Platter for 4", brand: "Sakura Kitchen", categoryId: "order-in", subcategory: "Asian", points: 4500, image: catOrderin, description: "48-piece premium sushi platter with miso soup.", productCode: "BIW-4002", deliveryInfo: "Same-day delivery", cancellationPolicy: "Free cancellation up to 2 hours before delivery", badges: ["top", "discount"] },

  // Goodies
  { id: "good-1", name: "Luxury Chocolate Gift Box", brand: "CocoaCraft", categoryId: "goodies", subcategory: "Chocolates", points: 3000, image: catGoodies, description: "24 handcrafted artisan chocolates in a premium box.", productCode: "BIW-5001", deliveryInfo: "Ships within 3-5 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["top", "bestselling"] },
  { id: "good-2", name: "Artisan Cookie Collection", brand: "BakeHouse", categoryId: "goodies", subcategory: "Cookies", points: 1500, image: catGoodies, description: "12 gourmet cookies in assorted flavors.", productCode: "BIW-5002", deliveryInfo: "Ships within 2-4 business days", cancellationPolicy: "Free cancellation within 24 hours", badges: ["new"] },

  // Grocery
  { id: "groc-1", name: "Organic Produce Box", brand: "FarmFresh", categoryId: "grocery", subcategory: "Fresh Produce", points: 2800, image: catGrocery, description: "Weekly box of seasonal organic fruits and vegetables.", productCode: "BIW-6001", deliveryInfo: "Ships within 1-2 business days", cancellationPolicy: "Free cancellation within 12 hours", badges: ["top"] },
  { id: "groc-2", name: "Artisan Bakery Bundle", brand: "Golden Crust", categoryId: "grocery", subcategory: "Bakery", points: 1200, image: catGrocery, description: "Sourdough loaf, croissants, and baguette.", productCode: "BIW-6002", deliveryInfo: "Ships within 1-2 business days", cancellationPolicy: "Non-refundable", badges: ["new", "discount"] },
];

export const sampleOrders: Order[] = [
  { id: "ORD-10234", date: "2026-02-15", products: [{ name: "Premium Cold Brew Collection", quantity: 1 }, { name: "Luxury Chocolate Gift Box", quantity: 2 }], totalPoints: 8500, status: "Delivered" },
  { id: "ORD-10189", date: "2026-02-08", products: [{ name: "Italian Date Night Kit", quantity: 1 }], totalPoints: 3500, status: "Shipped" },
  { id: "ORD-10145", date: "2026-01-28", products: [{ name: "Sushi Platter for 4", quantity: 1 }, { name: "Organic Matcha Tea Set", quantity: 1 }], totalPoints: 6300, status: "Processing" },
  { id: "ORD-10098", date: "2026-01-15", products: [{ name: "Family Pizza Night Bundle", quantity: 2 }], totalPoints: 4000, status: "Delivered" },
];

export const faqs = [
  { question: "How do I redeem my points?", answer: "Browse our marketplace, add items to your cart, and complete checkout. Points will be deducted from your balance automatically." },
  { question: "What is the delivery timeframe?", answer: "Delivery times vary by product. Most physical items ship within 2-5 business days. E-vouchers are delivered instantly via email." },
  { question: "Can I cancel my order?", answer: "Cancellation policies vary by product. Check the product detail page for specific cancellation terms. Most orders can be cancelled within 24 hours." },
  { question: "How do I check my points balance?", answer: "Your current points balance is displayed in the header next to your name. Click on it for a detailed breakdown." },
  { question: "What if my order arrives damaged?", answer: "Contact our support team within 48 hours of delivery with photos. We'll arrange a replacement or refund your points." },
  { question: "Are there any restrictions on combining products?", answer: "No restrictions! You can mix products from any category in a single order." },
  { question: "How do I contact customer support?", answer: "Visit our Help Center and click 'Contact Us' or email support@culinarymarketplace.com." },
];